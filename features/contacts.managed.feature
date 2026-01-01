Feature: Managed contacts

  Scenario: Share managed contact
    Given new account
    When I tap 'nav-actions-button'
    And I tap 'nav-actions-contacts-new-button'
    And I tap 'contacts-invite-manual-button'
    Then 'app-cosmetics-name-input' is focused
    When I type random name
    And I press 'Enter'
    Then 'contacts-share-button' is visible
    # TODO: Add steps to share the contact
