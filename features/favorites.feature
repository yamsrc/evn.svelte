Feature: Favorites

  Scenario: Toggle group favorite
    Given new account
    And new group
    When I tap 'nav-contacts-button'
    And I tap first item of 'groups-list-content'
    Then the page is loaded
    And I tap 'groups-favorite-button'
    When I tap 'nav-contacts-button'
    Then 'favorites-list' is visible
    And 'favorites-list-content' contains that name
    When I tap first item of 'favorites-list-content'
    Then the page is loaded
    And input 'app-cosmetics-name-input' contains that name

  Scenario: Toggle contact favorite
    Given new account
    And new managed contact
    When I tap 'nav-contacts-button'
    Then 'contacts-list-content' is visible
    And 'favorites-list' is not visible
    When I tap first item of 'contacts-list-content'
    Then the page is loaded
    And I tap 'contacts-favorite-button'
    When I tap 'nav-contacts-button'
    Then 'favorites-list' is visible
    And 'favorites-list-content' contains that name
    When I tap first item of 'favorites-list-content'
    Then the page is loaded
    And input 'app-cosmetics-name-input' contains that name
    When I tap 'nav-contacts-button'
    And I tap first item of 'contacts-list-content'
    Then the page is loaded
    And I tap 'contacts-favorite-button'
    When I tap 'nav-contacts-button'
    Then 'favorites-list' is not visible
