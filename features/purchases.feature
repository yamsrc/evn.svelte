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
