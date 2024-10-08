## Changelog

## 0.0.7 Release Notes

### New Features and Enhancements

-   **Ripple Effect Fix for Issue #56**: Implemented a solution for the ripple effect issue identified in issue #56.
    This fix involves the use of absolute positioning for the ripple spans to ensure the effect is correctly rendered
    across all components where it's utilized.

### Fixes

-   **Modal Component Enhancements**:

    -   **Backward Compatibility**: Adjustments have been made to modals to enhance backward support. This includes
        reintroducing the `show` and `onClose` properties, which had been previously removed, ensuring that modal
        visibility control and close functionality can be easily managed.
    -   **Optional Actions**: Actions within modals have now been made optional, allowing for more flexible modal
        configurations according to specific use cases.
    -   **`onClose` Property Addition**: Added the ability for developers to specify an `onClose` handler directly on
        the modal component. This facilitates better control over the modal's behavior when attempting to close it.
    -   **Style Adjustments**: Made several adjustments to the modal's styles to improve its standalone appearance,
        ensuring that modals are visually appealing and align with the overall design system without requiring
        additional customization.

-   **General Type Corrections**: Conducted thorough reviews and corrections of the general types across the library to
    address and prevent misconceptions and incorrect type definitions. This update aims to enhance type safety and
    developer experience by ensuring accurate and clear type annotations.

### Version 0.0.6

### Updated

-   **CheckBox Component**: Fixed behavior using CheckBoxGroup Component.

### Version 0.0.5

#### Added

-   **React Select Component**: Introduces a component for utilizing React Select within a web component.
-   **Collapsible Component**: A new component for creating collapsible sections.
-   **Accordion Component**: A component for creating accordion-style UI elements.

#### Updated

-   **ConfirmModal API**: Introduced a new standard API which includes an `actions` prop. This prop accepts an object
    that allows customization of the "confirm" and "cancel" buttons.
-   **ConfirmModal Style**: Updated the default style of the ConfirmModal buttons for improved aesthetics.

### Version 0.0.3

#### Added

-   **Button Sizing Attribute**: Added an attribute to control the sizing of buttons.
-   **Button Processing State**: Buttons now support a processing state, which is triggered by `onClick` functions.
-   **List Components**: Added components for rendering lists, allowing for the specification of control types for each
    list item.

#### Updated

-   **Accordion Component**: (Note: This item appears in both versions 0.0.3 and 0.0.4. If this is a duplicate, consider
    removing it from one of the versions for clarity.)
