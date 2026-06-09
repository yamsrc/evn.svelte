Feature: Purchases

  Scenario: Web paywall shows Stripe plans and subscribe redirects to checkout
    Given new account
    And Stripe checkout is not loaded
    When I tap 'header-me-button'
    And I tap 'app-wallpaper-picture-tab'
    And I tap 'paywall-0'
    Then 'purchases-products' is visible
    And 'purchases-plan-yearly' is visible
    And 'purchases-plan-monthly' is visible
    And 'purchases-subscribe-button' is visible
    When I tap 'purchases-plan-yearly'
    And I tap 'purchases-subscribe-button'
    Then the browser is redirected to Stripe checkout

  Scenario: Returning from a cancelled Stripe checkout reopens the offer
    Given new account
    When path '/contacts/#checkout=cancel'
    Then 'purchases-products' is visible

  Scenario: Returning from a completed Stripe checkout confirms and shows thanks
    Given new account
    And the Stripe transaction confirms
    When path '/contacts/#session_id=cs_test_123'
    Then 'purchases-complete' is visible
    And 'purchases-products' is not visible
