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
    When I tap 'nav-contacts-button'
    Then some of 'contacts-panel' contains that name
    
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
    And 'join-accounts-accept-button' is visible
