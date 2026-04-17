Feature: Expenses

  Scenario: Create a new expense
    Given new account
    And I tap 'nav-expenses-button'
    And I tap 'expenses-empty-create-button'
    And I tap 'expenses-spendings-add-participants-button'
    Then 'participants-selector-add-button' is visible
    When I tap 'expenses-add-participants-create-button'
    Then 'app-cosmetics-name-input' is visible
    When I tap 'app-cosmetics-name-input'
    And I type random name
    Then 'app-cosmetics-submit-button' is not disabled
    When I tap 'app-cosmetics-submit-button'
    Then 'app-cosmetics-name-input' is not visible
    When I tap first item of 'contacts-list-content'
    And I tap 'participants-selector-add-button'
    Then 'expenses-form-title-input' is visible
    When I tap 'expenses-form-title-input'
    And I type random expense title
    And I press 'Tab'
    Then 'expenses-form-location-input' is focused
    And I type random location
    When I tap 'expenses-total-input'
    And I type '100'
    Then input 'expenses-participant-amount-0' contains '50'
    And input 'expenses-participant-amount-1' contains '50'
    And I tap 'expenses-form-save-button'
    Then the page contains that name
    When I tap 'nav-expenses-button'
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '100'

  Scenario: Add participant to expense
    Given new account
    And new managed contact
    And new expense
    Then 'expenses-details-title' is visible
    And 'expenses-details-title' contains that name
    When I tap 'expenses-edit-action'
    Then 'expenses-form-title-input' is visible
    When I tap first visible 'expenses-spendings-add-participants-button'
    Then 'participants-selector-add-button' is visible
    When I tap first item of 'contacts-list-content'
    And I tap 'participants-selector-add-button'
    Then 'expenses-participant-amount-2' is visible
    When I tap 'expenses-participant-amount-0'
    And I clear 'expenses-participant-amount-0'
    And I type '34'
    And I tap 'expenses-participant-amount-1'
    And I clear 'expenses-participant-amount-1'
    And I type '33'
    And I tap 'expenses-participant-amount-2'
    And I clear 'expenses-participant-amount-2'
    And I type '33'
    When I tap 'expenses-form-save-button'
    Then the page contains that name
    And the page contains text '100'
    When I tap 'nav-expenses-button'
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '100'

  Scenario: Edit expense
    Given new account
    And new expense
    Then 'expenses-details-title' is visible
    When I tap 'expenses-edit-action'
    Then 'expenses-form-title-input' is visible
    When I tap 'expenses-form-title-input'
    And I clear 'expenses-form-title-input'
    And I type random expense title
    And I press 'Tab'
    Then input 'expenses-form-title-input' contains that name
    When I tap 'expenses-total-input'
    And I clear 'expenses-total-input'
    And I type '200'
    Then input 'expenses-participant-amount-0' contains '100'
    And input 'expenses-participant-amount-1' contains '100'
    When I tap 'expenses-participant-amount-0'
    And I clear 'expenses-participant-amount-0'
    And I type '150'
    Then input 'expenses-participant-amount-0' contains '150'
    When I tap 'expenses-form-save-button'
    Then 'expenses-form-title-input' is visible
    When I tap 'expenses-participant-amount-0'
    And I clear 'expenses-participant-amount-0'
    And I type '100'
    Then input 'expenses-participant-amount-0' contains '100'
    When I tap 'expenses-form-save-button'
    Then the page contains that name
    And the page contains text '200'
    When I tap 'nav-expenses-button'
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '200'

  Scenario: Create expense with share-based splitting
    Given new account
    And new managed contact
    And I tap 'nav-contacts-button'
    And I tap 'nav-home-button'
    And I tap 'nav-actions-button'
    And I tap 'nav-actions-cheques-input-button'
    And I tap 'expenses-spendings-add-participants-button'
    Then 'participants-selector-add-button' is visible
    When I tap first item of 'contacts-list-content'
    And I tap 'participants-selector-add-button'
    Then 'expenses-form-title-input' is visible
    When I tap 'expenses-form-title-input'
    And I type random expense title
    And I press 'Tab'
    And I type random location
    When I tap 'expenses-total-input'
    And I type '100'
    Then 'expenses-participant-amount-1' is visible
    Then input 'expenses-participant-amount-0' contains '50'
    And input 'expenses-participant-amount-1' contains '50'
    When I tap 'expenses-participants-tabs-shares'
    Then 'expenses-participant-share-0' is visible
    And 'expenses-participant-share-1' is visible
    Then 'expenses-participant-share-0-dots' contains 1 elements
    And 'expenses-participant-share-1-dots' contains 1 elements
    When I tap 'expenses-participant-share-0-increment'
    And I tap 'expenses-participant-share-0-increment'
    And I tap 'expenses-participant-share-0-increment'
    And I tap 'expenses-participant-share-0-increment'
    And I tap 'expenses-participant-share-1-increment'
    And I tap 'expenses-participant-share-1-increment'
    And I tap 'expenses-participant-share-1-increment'
    And I tap 'expenses-participant-share-1-increment'
    Then 'expenses-participant-share-0-dots' contains 5 elements
    And 'expenses-participant-share-1-dots' contains 5 elements
    When I tap 'expenses-participant-share-1-decrement'
    And I tap 'expenses-participant-share-1-decrement'
    Then 'expenses-participant-share-1-dots' contains 3 elements
    And 'expenses-participant-share-0' contains text '62.50'
    And 'expenses-participant-share-1' contains text '37.50'
    When I tap 'expenses-participants-tabs-sums'
    Then input 'expenses-participant-amount-0' contains '50'
    And input 'expenses-participant-amount-1' contains '50'
    When I tap 'expenses-participants-tabs-shares'
    And I tap 'expenses-form-save-button'
    Then the page contains that name
    When I tap 'nav-expenses-button'
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '100'

  Scenario: Tab switching and state preservation
    Given new account
    And new managed contact
    And I tap 'nav-contacts-button'
    And I tap 'nav-home-button'
    And I tap 'nav-actions-button'
    And I tap 'nav-actions-cheques-input-button'
    And I tap 'expenses-spendings-add-participants-button'
    Then 'participants-selector-add-button' is visible
    When I tap first item of 'contacts-list-content'
    And I tap 'participants-selector-add-button'
    Then 'expenses-form-title-input' is visible
    When I tap 'expenses-form-title-input'
    And I type random expense title
    And I press 'Tab'
    And I type random location
    When I tap 'expenses-total-input'
    And I type '100'
    Then 'expenses-participant-amount-1' is visible
    When I tap 'expenses-participant-amount-0'
    And I clear 'expenses-participant-amount-0'
    And I type '50'
    When I tap 'expenses-participants-tabs-shares'
    Then 'expenses-participant-share-0' is visible
    And 'expenses-participant-share-1' is visible
    When I tap 'expenses-participants-tabs-sums'
    Then 'expenses-participant-amount-0' is visible
    And input 'expenses-participant-amount-0' contains '50'
    And I tap 'expenses-form-save-button'
    Then the page contains that name
    When I tap 'nav-expenses-button'
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '100'

  Scenario: Share limits and edge cases
    Given new account
    And new managed contact
    And I tap 'nav-contacts-button'
    And I tap 'nav-home-button'
    And I tap 'nav-actions-button'
    And I tap 'nav-actions-cheques-input-button'
    And I tap 'expenses-spendings-add-participants-button'
    Then 'participants-selector-add-button' is visible
    When I tap first item of 'contacts-list-content'
    And I tap 'participants-selector-add-button'
    Then 'expenses-form-title-input' is visible
    When I tap 'expenses-form-title-input'
    And I type random expense title
    And I press 'Tab'
    And I type random location
    When I tap 'expenses-total-input'
    And I type '100'
    Then 'expenses-participant-amount-1' is visible
    When I tap 'expenses-participants-tabs-shares'
    Then 'expenses-participant-share-0-dots' contains 1 elements
    And 'expenses-participant-share-1-dots' contains 1 elements
    When I tap 'expenses-participant-share-0-increment'
    And I tap 'expenses-participant-share-0-increment'
    And I tap 'expenses-participant-share-0-increment'
    And I tap 'expenses-participant-share-0-increment'
    And I tap 'expenses-participant-share-1-increment'
    And I tap 'expenses-participant-share-1-increment'
    And I tap 'expenses-participant-share-1-increment'
    And I tap 'expenses-participant-share-1-increment'
    Then 'expenses-participant-share-0-dots' contains 5 elements
    And 'expenses-participant-share-1-dots' contains 5 elements
    When I tap 'expenses-participant-share-1-decrement'
    Then 'expenses-participant-share-1-dots' contains 4 elements
    And 'expenses-participant-share-0' contains text '55.55'
    And 'expenses-participant-share-1' contains text '44.45'
    When I tap 'expenses-participants-tabs-sums'
    Then input 'expenses-participant-amount-0' contains '50'
    And input 'expenses-participant-amount-1' contains '50'
    When I tap 'expenses-participants-tabs-shares'
    When I tap 'expenses-participant-share-1-decrement'
    And I tap 'expenses-participant-share-1-decrement'
    And I tap 'expenses-participant-share-1-decrement'
    And I tap 'expenses-participant-share-1-decrement'
    Then 'expenses-participant-share-1-dots' contains 0 elements
    And 'expenses-participant-share-0' contains text '100'
    When I tap 'expenses-participants-tabs-sums'
    Then input 'expenses-participant-amount-0' contains '50'
    When I tap 'expenses-participants-tabs-shares'
    When I tap 'expenses-participant-share-1-increment'
    Then 'expenses-participant-share-1-dots' contains 1 elements
    And 'expenses-participant-share-0' contains text '83.33'
    And 'expenses-participant-share-1' contains text '16.67'
    When I tap 'expenses-participants-tabs-sums'
    Then input 'expenses-participant-amount-0' contains '50'
    And input 'expenses-participant-amount-1' contains '50'
    And I tap 'expenses-form-save-button'
    Then the page contains that name
    When I tap 'nav-expenses-button'
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '100'

  Scenario: Shares work after clearing sums
    Given new account
    And new managed contact
    And I tap 'nav-contacts-button'
    And I tap 'nav-home-button'
    And I tap 'nav-actions-button'
    And I tap 'nav-actions-cheques-input-button'
    And I tap 'expenses-spendings-add-participants-button'
    Then 'participants-selector-add-button' is visible
    When I tap first item of 'contacts-list-content'
    And I tap 'participants-selector-add-button'
    Then 'expenses-form-title-input' is visible
    When I tap 'expenses-form-title-input'
    And I type random expense title
    When I tap 'expenses-total-input'
    And I type '100'
    Then input 'expenses-participant-amount-0' contains '50'
    And input 'expenses-participant-amount-1' contains '50'
    When I tap 'expenses-participant-amount-0'
    And I clear 'expenses-participant-amount-0'
    And I type '0'
    And I tap 'expenses-participant-amount-1'
    And I clear 'expenses-participant-amount-1'
    And I type '0'
    When I tap 'expenses-participants-tabs-shares'
    Then 'expenses-participant-share-0' is visible
    And 'expenses-participant-share-0-dots' contains 1 elements
    And 'expenses-participant-share-1-dots' contains 1 elements
    And 'expenses-participant-share-0' contains text '50'
    And 'expenses-participant-share-1' contains text '50'
    When I tap 'expenses-participant-share-0-increment'
    Then 'expenses-participant-share-0-dots' contains 2 elements
    And 'expenses-participant-share-0' contains text '66.66'
    And 'expenses-participant-share-1' contains text '33.34'

  Scenario: Total changes with even split
    Given new account
    And new expense
    Then 'expenses-details-title' is visible
    When I tap 'expenses-edit-action'
    Then 'expenses-form-title-input' is visible
    When I tap 'expenses-total-input'
    And I clear 'expenses-total-input'
    And I type '100'
    Then input 'expenses-participant-amount-0' contains '50'
    And input 'expenses-participant-amount-1' contains '50'
    When I tap 'expenses-total-input'
    And I clear 'expenses-total-input'
    And I type '200'
    Then input 'expenses-participant-amount-0' contains '100'
    And input 'expenses-participant-amount-1' contains '100'
    And I tap 'expenses-form-save-button'
    Then the page contains that name
    And the page contains text '200'
    When I tap 'nav-expenses-button'
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '200'
