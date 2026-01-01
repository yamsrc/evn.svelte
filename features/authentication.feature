Feature: Authentication

  Scenario: Create an account using email and password
    Given path '/'
    When I tap 'iam-email-tab'
    Then 'iam-username-input' is focused
    And I type random email
    And I press 'Tab'
    Then 'iam-password-input' is focused
    And I type random password
    And I press 'Enter'
    Then 'accounts-name-input' is focused
    And I type random name
    And I press 'Enter'
    Then I am authenticated

  Scenario: Logout
    Given new account
    Then I am authenticated
    When I tap 'nav-me-button'
    And I hold 'me-logout-button' for 1s
    Then I am not authenticated
