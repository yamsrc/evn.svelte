Feature: Purchases

  Scenario: Web paywall shows Stripe plans
    Given new account
    When I tap 'header-me-button'
    And I tap 'app-wallpaper-picture-tab'
    And I tap 'paywall-0'
    Then 'purchases-products' is visible
    And 'purchases-plan-yearly' is visible
    And 'purchases-plan-monthly' is visible
    And 'purchases-subscribe-button' is visible
