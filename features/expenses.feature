Feature: Expenses

  Scenario: Create a new expense
    Given new account
    When I tap 'nav-actions-button'
    And I tap 'nav-actions-cheqes-input-button'
    Then 'expenses-form-title-input' is visible
    When I tap 'expenses-form-title-input'
    And I type 'ExpenseTitle'
    And I press 'Tab'
    Then 'expenses-form-location-input' is focused
    And I type random location
    When I tap 'expenses-form-save-button'
    Then path matches '/expenses/'
    Then 'expenses-list' contains text 'ExpenseTitle'

  Scenario: View expenses list
    Given new account
    When path '/expenses/'
    Then the page is loaded

  Scenario: Add participant to expense
    Given new account
    And new expense
    When I tap first item of 'expenses-list'
    When I tap 'expenses-spendings-add-participants-button'
    Then path matches '/expenses/[^/]+/participants'
    And 'expenses-add-participants-add-button' is visible
    When I tap 'expenses-add-participants-add-button'
    Then path matches '/expenses/[^/]+/$'

  Scenario: Edit expense
    Given new account
    And new expense
    When I tap first item of 'expenses-list'
    When I tap 'expenses-form-title-input'
    And I clear 'expenses-form-title-input'
    And I type random expense title
    And I press 'Tab'
    Then input 'expenses-form-title-input' contains that name
