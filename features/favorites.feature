Feature: Favorites

  Scenario: Toggle contact favorite
    Given new account
    And new managed contact
    When path '/contacts/'
    Then 'contacts-list-content' is visible
    And 'favorites-list' is not visible
    And I capture the first contact name
    When I tap first item of 'contacts-list-content'
    Then the page is loaded
    And I tap 'contacts-favorite-button'
    When path '/contacts/'
    Then 'favorites-list' is visible
    And 'favorites-list-content' contains that name
    When I tap first item of 'favorites-list-content'
    Then the page is loaded
    And input 'app-cosmetics-name-input' contains that name
    And I tap 'contacts-favorite-button'
    When path '/contacts/'
    Then 'favorites-list' is not visible
