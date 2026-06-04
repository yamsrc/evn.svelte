@manual
Feature: Stripe checkout

  Scenario Outline: Checkout returns a redirect URL
    Given online account Bob
    When the request is sent:
      """
      POST /stripe/checkout/${{ Bob.id }}/ HTTP/1.1
      authorization: Token ${{ Bob.token }}
      accept: application/yaml
      content-type: application/yaml

      plan: <plan>
      successUrl: http://localhost:3000/thanks?session_id=DUMMY_SESSION_ID
      cancelUrl: http://localhost:3000/cancel
      """
    Then the response is received:
      """
      201 Created

      url: https://checkout.stripe.test/
      """
    Examples:
      | plan    |
      | monthly |
      | yearly  |

  Scenario: Unknown plan is rejected
    Given online account Bob
    When the request is sent:
      """
      POST /stripe/checkout/${{ Bob.id }}/ HTTP/1.1
      authorization: Token ${{ Bob.token }}
      accept: application/yaml
      content-type: application/yaml

      plan: nonexistent
      successUrl: http://localhost:3000/thanks?session_id=DUMMY_SESSION_ID
      cancelUrl: http://localhost:3000/cancel
      """
    Then the response is received:
      """
      422 Unprocessable Entity

      code: UNKNOWN_PLAN
      """

  Scenario: Disallowed redirect URL is rejected
    Given online account Bob
    When the request is sent:
      """
      POST /stripe/checkout/${{ Bob.id }}/ HTTP/1.1
      authorization: Token ${{ Bob.token }}
      accept: application/yaml
      content-type: application/yaml

      plan: monthly
      successUrl: https://evil.example/thanks
      cancelUrl: http://localhost:3000/cancel
      """
    Then the response is received:
      """
      422 Unprocessable Entity

      code: INVALID_ORIGIN
      """

  Scenario: Disallowed cancel URL is rejected
    Given online account Bob
    When the request is sent:
      """
      POST /stripe/checkout/${{ Bob.id }}/ HTTP/1.1
      authorization: Token ${{ Bob.token }}
      accept: application/yaml
      content-type: application/yaml

      plan: monthly
      successUrl: http://localhost:3000/thanks?session_id=DUMMY_SESSION_ID
      cancelUrl: https://evil.example/cancel
      """
    Then the response is received:
      """
      422 Unprocessable Entity

      code: INVALID_ORIGIN
      """

  # Assumes Stripe is configured with a real 'monthly' product and matching currency_options.
  # Price is in smallest currency units (Stripe unit_amount), e.g. 299 for 2.99 EUR.
  # The stub client does not implement product listing.
  Scenario Outline: List products localized by country
    When the request is sent:
      """
      GET /stripe/checkout/products/ HTTP/1.1
      accept: application/yaml
      cf-ipcountry: <country>
      """
    Then the response is received:
      """
      200 OK
      cache-control: no-cache

      - id: ${{ product.id }}
        name: monthly
        price: <price>
        currency: <currency>
      """
    Examples:
      | country | price | currency |
      | DE      | 299   | EUR      |
      | GB      | 299   | GBP      |
      | US      | 299   | USD      |
