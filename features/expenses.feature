Feature: Expenses

  Scenario: Create a new expense
    # Setup: Create a new account for testing
    Given new account
    # Navigate to expense creation form via action button
    When I tap 'nav-actions-button'
    And I tap 'nav-actions-cheqes-input-button'
    # Verify expense form is ready for participant selection
    Then 'expenses-add-participants-add-button' is visible
    # Add self as participant (default participant)
    When I tap 'expenses-add-participants-add-button'
    Then 'expenses-form-title-input' is visible
    # Fill in expense details: title and location
    When I tap 'expenses-form-title-input'
    And I type random expense title
    And I press 'Tab'
    Then 'expenses-form-location-input' is focused
    And I type random location
    # Set total amount and verify it auto-fills participant amount
    When I tap 'expenses-total-input'
    And I type '100'
    Then input 'expenses-participant-amount-0' contains '100'
    # Select payer and save expense
    When I select payer from dropdown
    And I tap 'expenses-form-save-button'
    And I wait for navigation
    # Verify expense appears in list with correct details
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '100'

  Scenario: View expenses list
    # Setup: Create a new account
    Given new account
    # Navigate to expenses page
    When path '/expenses/'
    # Verify page loads successfully
    Then the page is loaded

  Scenario: Add participant to expense
    # Setup: Create account, contact, and an existing expense
    Given new account
    And new managed contact
    And new expense
    # Open existing expense for editing
    When I tap first item of 'expenses-list'
    Then 'expenses-form-title-input' is visible
    # Add a second participant to the expense
    When I tap first visible 'expenses-spendings-add-participants-button'
    Then 'expenses-add-participants-add-button' is visible
    # Select contact from list and add as participant
    When I tap first item of 'contacts-list-content'
    And I tap 'expenses-add-participants-add-button'
    # Verify second participant field appears
    Then 'expenses-participant-amount-1' is visible
    # Save changes
    When I tap 'expenses-form-save-button'
    And I wait for navigation
    # Verify expense still appears in list with correct total
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '100'

  Scenario: Edit expense
    # Setup: Create account and an existing expense
    Given new account
    And new expense
    # Open expense for editing
    When I tap first item of 'expenses-list'
    Then 'expenses-form-title-input' is visible
    # Edit expense title
    When I tap 'expenses-form-title-input'
    And I clear 'expenses-form-title-input'
    And I type random expense title
    And I press 'Tab'
    Then input 'expenses-form-title-input' contains that name
    # Update total amount and verify participant amount updates
    When I tap 'expenses-total-input'
    And I clear 'expenses-total-input'
    And I type '200'
    Then input 'expenses-participant-amount-0' contains '200'
    # Manually override participant amount
    When I tap 'expenses-participant-amount-0'
    And I clear 'expenses-participant-amount-0'
    And I type '150'
    Then input 'expenses-participant-amount-0' contains '150'
    # Save first set of changes
    When I tap 'expenses-form-save-button'
    And I wait for navigation
    Then 'expenses-form-title-input' is visible
    # Re-open and adjust participant amount back to match total
    When I tap 'expenses-participant-amount-0'
    And I clear 'expenses-participant-amount-0'
    And I type '200'
    Then input 'expenses-participant-amount-0' contains '200'
    # Save final changes
    When I tap 'expenses-form-save-button'
    And I wait for navigation
    # Verify expense updated correctly in list
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '200'

  Scenario: Create expense with share-based splitting
    # Setup: Create account and contact
    Given new account
    And new managed contact
    # Navigate to expense creation form
    When I tap 'nav-actions-button'
    And I tap 'nav-actions-cheqes-input-button'
    Then 'expenses-add-participants-add-button' is visible
    # Add self as first participant
    When I tap 'expenses-add-participants-add-button'
    Then 'expenses-form-title-input' is visible
    # Fill in expense basic details
    When I tap 'expenses-form-title-input'
    And I type random expense title
    And I press 'Tab'
    And I type random location
    # Set total amount
    When I tap 'expenses-total-input'
    And I type '100'
    # Add second participant (contact)
    When I tap first visible 'expenses-spendings-add-participants-button'
    Then 'expenses-add-participants-add-button' is visible
    When I tap first item of 'contacts-list-content'
    And I tap 'expenses-add-participants-add-button'
    Then 'expenses-participant-amount-1' is visible
    # Switch to shares tab for proportional splitting
    When I tap 'expenses-participants-tabs-shares'
    Then 'expenses-participant-share-0' is visible
    And 'expenses-participant-share-1' is visible
    # Verify initial equal shares (5 dots each = 50/50 split)
    Then 'expenses-participant-share-0-dots' contains 5 elements
    And 'expenses-participant-share-1-dots' contains 5 elements
    # Adjust shares: reduce second participant's share by 2 (from 5 to 3 dots)
    When I tap 'expenses-participant-share-1-decrement'
    And I tap 'expenses-participant-share-1-decrement'
    Then 'expenses-participant-share-1-dots' contains 3 elements
    # Verify calculated amounts based on share ratio (5:3 = 62.50:37.50)
    And 'expenses-participant-share-0' contains text '62.50'
    And 'expenses-participant-share-1' contains text '37.50'
    # Switch back to sums tab and verify amounts match
    When I tap 'expenses-participants-tabs-sums'
    Then input 'expenses-participant-amount-0' contains '62.50'
    And input 'expenses-participant-amount-1' contains '37.50'
    # Return to shares tab, select payer, and save
    When I tap 'expenses-participants-tabs-shares'
    And I select payer from dropdown
    And I tap 'expenses-form-save-button'
    And I wait for navigation
    # Verify expense saved correctly
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '100'

  Scenario: Tab switching and state preservation
    # Setup: Create account and contact
    Given new account
    And new managed contact
    # Navigate to expense creation form
    When I tap 'nav-actions-button'
    And I tap 'nav-actions-cheqes-input-button'
    Then 'expenses-add-participants-add-button' is visible
    # Add first participant
    When I tap 'expenses-add-participants-add-button'
    Then 'expenses-form-title-input' is visible
    # Fill in expense details
    When I tap 'expenses-form-title-input'
    And I type random expense title
    And I press 'Tab'
    And I type random location
    # Set total and add second participant
    When I tap 'expenses-total-input'
    And I type '100'
    When I tap first visible 'expenses-spendings-add-participants-button'
    Then 'expenses-add-participants-add-button' is visible
    When I tap first item of 'contacts-list-content'
    And I tap 'expenses-add-participants-add-button'
    Then 'expenses-participant-amount-1' is visible
    # Manually set first participant amount to 50 (on sums tab)
    When I tap 'expenses-participant-amount-0'
    And I clear 'expenses-participant-amount-0'
    And I type '50'
    # Switch to shares tab
    When I tap 'expenses-participants-tabs-shares'
    Then 'expenses-participant-share-0' is visible
    And 'expenses-participant-share-1' is visible
    # Switch back to sums tab and verify manual amount is preserved
    When I tap 'expenses-participants-tabs-sums'
    Then 'expenses-participant-amount-0' is visible
    And input 'expenses-participant-amount-0' contains '50'
    # Complete expense creation
    When I select payer from dropdown
    And I tap 'expenses-form-save-button'
    And I wait for navigation
    # Verify expense saved
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '100'

  Scenario: Share limits and edge cases
    # Setup: Create account and contact
    Given new account
    And new managed contact
    # Navigate to expense creation form
    When I tap 'nav-actions-button'
    And I tap 'nav-actions-cheqes-input-button'
    Then 'expenses-add-participants-add-button' is visible
    # Add first participant and fill expense details
    When I tap 'expenses-add-participants-add-button'
    Then 'expenses-form-title-input' is visible
    When I tap 'expenses-form-title-input'
    And I type random expense title
    And I press 'Tab'
    And I type random location
    # Set total and add second participant
    When I tap 'expenses-total-input'
    And I type '100'
    When I tap first visible 'expenses-spendings-add-participants-button'
    Then 'expenses-add-participants-add-button' is visible
    When I tap first item of 'contacts-list-content'
    And I tap 'expenses-add-participants-add-button'
    Then 'expenses-participant-amount-1' is visible
    # Switch to shares tab
    When I tap 'expenses-participants-tabs-shares'
    # Verify initial equal shares
    Then 'expenses-participant-share-0-dots' contains 5 elements
    And 'expenses-participant-share-1-dots' contains 5 elements
    # Test share adjustment: reduce second participant by 1 (5:4 ratio)
    When I tap 'expenses-participant-share-1-decrement'
    Then 'expenses-participant-share-1-dots' contains 4 elements
    # Verify calculated amounts (5:4 ratio = 55.55:44.45)
    And 'expenses-participant-share-0' contains text '55.55'
    And 'expenses-participant-share-1' contains text '44.45'
    # Verify amounts sync to sums tab
    When I tap 'expenses-participants-tabs-sums'
    Then input 'expenses-participant-amount-0' contains '55.55'
    And input 'expenses-participant-amount-1' contains '44.45'
    # Test minimum share limit: reduce second participant to 0 (all to first)
    When I tap 'expenses-participants-tabs-shares'
    When I tap 'expenses-participant-share-1-decrement'
    And I tap 'expenses-participant-share-1-decrement'
    And I tap 'expenses-participant-share-1-decrement'
    And I tap 'expenses-participant-share-1-decrement'
    Then 'expenses-participant-share-1-dots' contains 0 elements
    # Verify first participant gets 100% when second has 0 shares
    And 'expenses-participant-share-0' contains text '100'
    When I tap 'expenses-participants-tabs-sums'
    Then input 'expenses-participant-amount-0' contains '100'
    # Test incrementing from minimum: add 1 share back to second participant
    When I tap 'expenses-participants-tabs-shares'
    When I tap 'expenses-participant-share-1-increment'
    Then 'expenses-participant-share-1-dots' contains 1 elements
    # Verify calculated amounts (5:1 ratio = 83.33:16.67)
    And 'expenses-participant-share-0' contains text '83.33'
    And 'expenses-participant-share-1' contains text '16.67'
    # Verify amounts sync to sums tab
    When I tap 'expenses-participants-tabs-sums'
    Then input 'expenses-participant-amount-0' contains '83.33'
    And input 'expenses-participant-amount-1' contains '16.67'
    # Complete expense creation
    When I select payer from dropdown
    And I tap 'expenses-form-save-button'
    And I wait for navigation
    # Verify expense saved correctly
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '100'

  Scenario: Total changes with even split
    # Setup: Create account and contact
    Given new account
    And new managed contact
    # Navigate to expense creation form
    When I tap 'nav-actions-button'
    And I tap 'nav-actions-cheqes-input-button'
    Then 'expenses-add-participants-add-button' is visible
    # Add first participant and fill expense details
    When I tap 'expenses-add-participants-add-button'
    Then 'expenses-form-title-input' is visible
    When I tap 'expenses-form-title-input'
    And I type random expense title
    And I press 'Tab'
    And I type random location
    # Set initial total to 100
    When I tap 'expenses-total-input'
    And I type '100'
    # Manually set participant amount to match total (even split with single participant)
    When I tap 'expenses-participant-amount-0'
    And I type '100'
    # Update total to 200 and verify participant amount updates proportionally
    When I tap 'expenses-total-input'
    And I clear 'expenses-total-input'
    And I type '200'
    # Verify participant amount updates to match new total
    Then input 'expenses-participant-amount-0' contains '200'
    # Complete expense creation
    When I select payer from dropdown
    And I tap 'expenses-form-save-button'
    And I wait for navigation
    # Verify expense saved with updated total
    Then 'expenses-list' contains that name
    And 'expenses-list' contains text '200'