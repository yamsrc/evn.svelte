Feature: Managed accounts

  Scenario: Create managed account
    Given new account
    When I tap 'nav-actions-button'
    And I tap 'nav-actions-contacts-new-button'
    And I tap 'contacts-invite-manual-button'
    Then 'app-cosmetics-name-input' is focused
    When I type random name
    And I press 'Enter'
    Then 'contacts-share-button' is visible
    And input 'app-cosmetics-name-input' contains that name
    
  Scenario: Update managed account
    Given new account
    And new managed contact
    When I double tap 'app-cosmetics-name-input'
    And I press 'Backspace'
    And I type random name
    And I press 'Enter'
    Then 'app-cosmetics-name-input' is not disabled
    And input 'app-cosmetics-name-input' contains that name

  Scenario: Capture managed account
    Given new account
    And new managed contact
    When I tap 'contacts-share-button'
    Then my clipboard is not empty
    When I clear the session
    And I open link from the clipboard
    Then 'join-accounts-accept-button' is visible
    When I tap 'join-accounts-accept-button'
    Then 'iam-passkey-create-button' is visible
    And 'iam-passkey-login-button' is not visible
    When I tap 'iam-email-tab'
    And 'iam-username-input' is focused
    And I type random email
    And I press 'Tab'
    Then 'iam-password-input' is focused
    And I type random password
    And I press 'Enter'
    Then I am authenticated
