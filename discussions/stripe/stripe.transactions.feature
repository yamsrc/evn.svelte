@manual
Feature: Stripe transactions

  Scenario: Return-side grants premium
    Given online account Bob
    When the request is sent:
      """
      POST /stripe/transactions/${{ Bob.id }}/ HTTP/1.1
      authorization: Token ${{ Bob.token }}
      accept: application/yaml
      content-type: application/yaml

      sessionId: #{{ id | set stripe.session.id }}
      """
    Then the response is received:
      """
      201 Created

      id: ${{ transaction.id }}
      """
    And realtime event `default.accounts.sync` has been received by Bob:
      """
      premium:
      """
    When the request is sent:
      """
      GET /accounts/echo/ HTTP/1.1
      authorization: Token ${{ Bob.token }}
      accept: application/yaml
      """
    Then the response is received:
      """
      200 OK

      id: ${{ Bob.id }}
      premium: ${{ premium.expires }}
      """
    And realtime event `default.accounts.sync` has been received by Bob:
      """
      premium: ${{ premium.expires }}
      """
