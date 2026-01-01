Feature: Authentication

  Scenario: Create an account using email and password
    Given path '/'
    When I tap 'email-tab'
    Then 'username-input' is focused
    And I type random email
    And I press 'Tab'
    Then 'password-input' is focused
    And I type random password
    And I press 'Enter'
    Then 'name-input' is focused
    And I type random name
    And I press 'Enter'
    Then I am authenticated

  Scenario: Logout
    Given new account
    Then I am authenticated
    When I tap 'nav-me'
    And I hold 'logout-button' for 1s
    Then I am not authenticated
