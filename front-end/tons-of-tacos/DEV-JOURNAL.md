## This Journal tracks development progress, ideas and thoughts as proof I (Adam Straub) am the developer.

---

-- 2 Dec 2024 --

- Update to cart item so that if cart item quantity exceeds given amount then customer is alerted via our alert modal component instead of browser alert.
- Updated phone number validation in form library, checkPhone(), to match validation created on back end.
- Styling for global error updated to be more responsive.
- Styling updated in customer form so that any validation errors for input fields are more responsive.

---

-- 25 Nov 2024 --

- Improvements to handling conditional display of menu. Created a click handler that listens for clicks outside of the menu component and closes the menu if click comes from outside the target.

- Scrubbed files for unused code.

- Updated quantity selector and add to cart to utilize our alert modal instead of alert();

---

-- 20 Nov 2024 --

- Implemented solution into cartToggle as well. Result is somewhat mixed.
  - Appears we are getting the nav options without an animation rerender bringing us to original state, but there is lag requiring a double click in most instances to activate the desired behavior. Will be seeing if I can address this next.
  - File scrubbed of unnecessary code.

---

-- 19 Nov 2024 --

- Appear to have found a means for changing the sate of menu and cart without rerender which would essentially provide the same state as before. Solution implemented into menu, will try in cart next.

---

-- 18 Nov 2024 --

While testing user experience witnessed frustration with cart disappearing if user was moving quickly as they were sliding off the cart triggering the close. Created event listener that would instead leave the cart open until the user clicked another element. Implemented similar in menu. Also opted for on click instead of entered. On entered would also create odd jitters. Perhaps more from rerender.

---

-- 14 Nov 2024 --

- While continuing with error handling have come to realize, this work often leads to refactoring also. Therefore, will push the current changes and continue work from the refactoring branch.
- Try catch blocks added to cart library.
- Try catch blocks added to menu library.
- Refactored so that we have an order confirmation and an alert modal separated from each other.

---

-- 13 Nov 2024 --

- Began work on improving error handling for system tasks like checking if connection can be made to database.
  - Main header was in layout but outside of error boundary I believe and would be why our error page wasn't loading when server was down. Will research further down the road.
  - After much fiddling about found the tiny line in next.js docs next page of error handling that reads "global-error.js is only enabled in production. In development, our error overlay will show instead." Please put the unique circumstance highlighted up front as soon as you start talking about the topic so people aren't pulling their hair out trying to figure what is going on.
    - If we move the main header out of the root layout the error handling functions as intended. I may try creating a layout in that route, throwing the header in there and seeing how that plays out. Will actually want a different header between customer interface and owner interface so that might work. Anyway continuing on with error handling to see where else we can make improvements.

---

-- 12 Nov 2024 --

- Backend team rectified previously mentioned issue and we are back to work.
- Improved the ux by changing the nav buttons to work of on click instead of on enter. The issue seemed to stem from the component not quite yet loaded before a user moved the mouse cursor away creating an unwelcome jitter. Will observe over time.
- Improved on submit button styling for cart form.

---

-- 5 Nov 2024 --

- Closing order confirmation now resets the cart. Ran into error where backend is preserving last customer instead of resetting the data to start new order. Will address this next.

- Menu nav adjusted for lower width resolution.
- Media request styling for 1000px width in form styling eliminated.
- Adjusted 1400 media request for cart.
- Adjustments to nav buttons at less than 800
- Adjusted 800 media request for cart.
- Adjusted cart badge for 800 media query.
- Removed cart badge styling at 500.
- Drop down animation moved from nav buttons into individual menu nav and cart components.
- Animation placement updated to be dynamic based on display size.
- Styling refactored for menu nav and cart in order to facilitate updated file schema.
- Program scrubbed for outdated code and comments.

---

-- 17 Oct 2024 --

- Styling updated to accommodate file organization for cart component.

---

-- 10 Oct 2024 --

- Increased padding around nav buttons and restyled to accomodate.

---

-- 9 Oct 2024 --

- Moved menu nav styling to menu nav style sheet from main header style sheet.
- Restyled menu nav elements to correspond with new placement of components.

---

-- 8 Oct 2024 --

- Moved nav buttons styling into its own style sheet next to nav buttons component.

- Transferred Cart styling from main header style sheet to cart stylesheet.

- Adjusted styling for cart badge.

- Created menu nav style sheet module.

---

- -- 6 Oct 2024 --

- Shifted alert/modal out of cart and into the layout. This should allow for a proper modal after styling and prevent it from vanishing when mouse leaves cart.

- Witnessed bug caused by alert being made visible before being able to capture and set response as alert. Resolved with timeout.

- Components relating to modal work scrubbed for unused code and comments. Alert styling scrubbed.

---

-- 3 Oct 2024 --

- Styling adjustments for responsiveness.

---

-- 29 Sep 2024 --

- Order confirmation text formatted. Ready to begin styling.
- Styling is in place and functionality for closing the alert and redirecting to home page.

---

-- 28 Sep 2024 --

- Order confirmation is now correctly being captured and forwarded to our alert component. Time for some styling and formatting.
- Files scrubbed for unused comments and code. Functionality remains.

---

-- 25 Sep 2024 --

- Placed Alert component in layout. Created an alert context in order to pass the response messages from any request necessary. Hopefully may need to alter a bit to get desired result.

---

-- 24 Sep 2024 --

- Initialization of alert components. Alert component and styling in components folder, show context, providers and layout files updated.

---

-- 21 Sep 2024 --

- Succeeded in capturing response into a string that will be able to be returned to the user. Little muddy and needs revision. Essentially using formState to store the value of the response as an object that is updated as the form action is executed. Feels a bit like lifting state earlier in the application build. If backend runs into exception return that response.

---

-- 19 Sep 2024 --

- Had a nice chat with the backend team (myself), and after reviewing the backend realized the requirements for an order object were over complicated. Made adjustments that allow much easier development for front end team (also me.).
- Front is now able to successfully transmit a customers order to the backend and receive a response.
- From this exercise a few observations were made and the project issues will be updated.
  - A need for an alert component that can be utilized application wide.
  - Separate the submit button from the form to its own component in the UI.
  - Create a new submit function that can capture the response from the back end when the order is created.

---

-- 7 Sep 2024 --

- Order object created but does not transmit correctly to back end yet. Possibly malformed object. Notes submitted to backend development team (me) >\_<; .

---

-- 5 Sep 2024 --

- Cart now also utilizes a menu id from the menu items added to the cart. This will match the specs of the backend when creating an order.

- Have begun work on building object to submit order in cart libray. Pausing work here so it can be continued on appropriate branch.

---

-- 4 Sep 2024 --

- Discovered flaw in data set up. Backend requires the id of the menu item that is generated at database creation. Cart makes use of a separate id in order to have unique identifier. Easiest path forward might be to pass menu item id as part of object and store that as part of a cart item as well and then pass it forward while creating the id.

---

-- 31 Aug 2024 --

- Have begun refactor of files and validation of customer form fields. Current code in validateName should serve as a template for further work.

- checkName in customer form library regex modified to look for spaces. Error message modified.

- Exported logic for name validation to customer form library.

- Last name validation now makes use of checkName from the customer for library.

- Exported phone validation logic to customer form library. Enhanced copy for warning message.

- Exported email validation logic to customer form library.

---

-- 20 Aug 2024 --

- Responsive design in place. Ready for refactor.

---

-- 14 Aug 2024 --

- Cart font sizes and margins adjusted for responsive design.

---

-- 13 Aug 2024 --

- Began work on responsive design for cart.

---

-- 10 Aug 2024 --

- Refactored styling and validation for a more granular approach and elimination of zod dependency. Not dead set on this solution as it does increase the individual file sizes a bit but may break them down into smaller components and then reincorporate into the form at a later time.

- Customer form validation is in place and will continue to be developed.

---

-- 3 Aug 2024 --

- Zod is in place with the functionality desired and providing correct validation and error messages.
- It works but only shows the error messages AFTER the form is submitted.
- My ux goal is to have more immediate feedback for the customer if the data entered into the field isn't acceptable.
- Going to begin working on my own solution next.

---

-- 2 Aug 2024 --

- Initial styling in place for customer info form.
- Moved form into cart in order to enhance customer experience. Customer no longer has to click a button in order to bring up the form and enter their data separately.

- Beginning work on writing my own validation for customer info form based on work done on backend for validation. While I appreciate what Zod provides, I feel like I'll have more control if I try to implement my own solution. Wish me luck!

---

-- 27 Jul 2024 --

- Getting much closer.

  - Difficulties were arising from determining a type from the filter for items in the error messages. Appears to be resolved. Callback statement is creating issues currently. The dependency array is based on errors being returned, if there are no errors this result in a state undefined that can not be read. Will be diving into this at a later time.

  - Solved with check. Will refine down the road.
  - Refactored to eliminate notes and irrelevant code.
  - Beginning work on styling form.

---

-- 24 Jul 2024 --

- Research continues into building forms in Next.js and form validation.
  Believe I have found a pattern I appreciate with Zod and have begun implementation.

---

-- 21 Jul 2024 --

- Finally getting back to work on project by capturing form data.
- Day job has been insane past month. So many boats and so many crew to train! Anyways, feels good to get back into it.

---

-- 26 Jun 2024 --

- Began work on actions file. Plan is as follows:
  - Create build order function in cart library. This will combine customer info obtained from check out form with the items stored in our cart in order to build the required order object to be submitted to api in order to place an order.
  - Work on form validation, possibly with Zod.

---

-- 24 Jun 2024 --

- Customer info form moved from cart component to nav button component to aid in styling.

- Began fleshing out form and removing placeholders.

---

-- 19 Jun 2024 --

- Customer info form linked to checkout button in cart component to render conditionally. Next steps will include fleshing out and styling form.

---

-- 17 Jun 2024 --

- Created files for checkout component and implemented styling. Still needs to programmed for functionality.
- Project updated on github.

---

-- 15 Jun 2024 --

- Cart now correctly checks if menu item has already been added to the cart and if so instructs user to use the cart in order to adjust quantities and remove items first. Functionality achieved through creation of additional parameter to be checked in cart context.
  - item in cart ? if not add to cart, if so alert user.
  - item removed from cart ? then item not in cart.
- Set Item Removed also implemented in cart quantity selector allowing for correct flow of functionality if cart item is removed due to setting the cart item quantity to zero.

- Refactored for elimination of unnecessary code.

---

-- 10 Jun 2024 --

- Removal of unused css.

---

-- 5 Jun 2024 --

- Implemented y overflow for cart.

---

-- 4 Jun 2024 --

- Cart padding and positioning improvements.
- General layout of cart as imagined.

---

-- 3 Jun 2024 --

- Improvements in cart styling. Components of cart item arranged in grid.
- Improved spacing of elements in quantity selector.

---

-- 27 May 2024 --

- File cleanup.
- Update quantity selector styling to be more responsive.
- Beginning to update the styling for the cart.

---

-- 24 May 2024 --

- Logic for determining if a menu item is already in the cart moved from use effect loop to a separate function executed on click of add to cart button.
- Already in cart alert bug resolved.

---

-- 23 May 2024 --

- Application now correctly using a unique key for menu and cart items and only the cart item selected is removed when clicking the remove button.
- Working out a bug where item already in cart alert is being triggered when adding an item to cart after all cart items have been removed.

---

-- 21 May 2024 --

- Application now checks if a menu item is already a cart item and if so, alerts the user to the status and recommends action through an alert.
- ***

  -- 20 May 2024 --

- Cart items now display an alert when their quantity would exceed the current limit of 10 or if their new quantity would exceed the cart limit of 20 total items.
- Cart item now removed from cart if quantity selected is 0.
- Cart quantity badge updates accordingly.
- Improved on cart display logic.
- Cart component ready for refactor.
- Cart components and functions scrubbed for outdated code and comments.

---

-- 17 May 2024 --

- Quantity of any cart item is now correctly limited to 10.

-- 16 May 2024 --

- Cart now correctly only displays update button only when the quantity for a cart item has been changed and only for that cart item.

---

-- 15 May 2024 --

- Logic in place for displaying update button only if a cart items quantity has been changed. Working towards ensuring update button is only displayed for item that has changed and not every item.

---

-- 13 May 2024 --

- Located bug that was consistently overwriting the first item in the cart with the updated cart item and preserving the old details of the altered cart item. This has been rectified and cart is now correctly allowing for cart items to have their quantity altered and the prices and cart quantity badge are reflective of those changes.

---

-- 7 May 2024 --

- Cart badge now reflects updated cart quantity when updating a cart item quantity.
  - Still need:
    - install quantity checks and alerts.
    - check if item already in cart when clicking add to cart and if so display alert to click cart icon and alter quantities there.
    - remove item from cart if quantity zero.

---

-- 5 May 2024 --

- Cart total placeholder replaced and cart appears to be correctly tallying the total for items in cart.
- Adjusting a cart items quantity displays a button for updating the cart, which updates the total.
  - Continuing on with bug hunting in cart component logic that may prevent cart from accurately being portrayed.

---

-- 1 May 2024 --

- Cart now displays conditionally according to if there is anything in the cart or not.

---

-- 30 Apr 2024 --

- Cart correctly displays an updated cart for the user when an item is added and when an item is removed.
- Cart quantity badge is correctly tracking and updating as the contents of the cart change.

---

-- 29 Apr 2024 --

- Continuing to build out cart component.
  - Progress made on removing an item from the cart. Needs to rerender in order to update cart state. Looking into utilizing context.
    -Forwarded ideas to ux and and design team (both are me ^\_^) in regards to improving on cart styling.

---

-- 27 Apr 2024 --

- Slight adjustment to cart styling in order to aid in development of cart functionality. Will finalize styling once functionality is in place.

- Cart component now has similar display functionality as menu category nav menu. Hove displays the cart, entering component continues to display and mouse leaving component causes component to vanish.

- Cart items now correctly adjust quantity and price when altered in the cart.

---

-- 25 Apr 2024 --

- Remove from cart button component added to ui library and integrated into cart component.
- Still need to update styling and program for functionality.

---

-- 24 Apr 2024 --

- Improved on styling with focus on responsiveness.

---

-- 22 Apr 2024 --

- Initialized styling of cart component.

---

-- 18 Apr 2024 --

- Continuation of fleshing out cart item and cart component.
- Altered get cart function from async to synchronous function.
- Cart components should be ready styling initialization.

---

-- 17 Apr 2024 --

- While working on cart item component I discovered code was not happy as custom hook was being called conditionally in a try catch black. Wrote a new function returns the custom hook and makes everything happy while still handling the error.

---

-- 16 Apr 2024 --

- Began fleshing out cart item.

---

-- 15 Apr 2024 --

- Project updated in github with actions to be taken to facilitate cart functionality.
- Additions to display context for displaying cart.
- Generic placeholder for cart implemented.
- Additions to nav buttons concerning logic for displaying cart.
- Generic cart item component created and ready to be fleshed out.

---

-- 13 Apr 2024 --

- Wireframe for cart display and checkout functions.

<p align="center">
  <img src="./media/wireframes/view-cart-and-checkout.png"/>
</p>

---

-- 11 Apr 2024 ---

- Enjoyed a little break after completing sprint and have started looking at implementation of cart for customer view to then be followed up by order submission.
- Also starting back at seasonal day job today. Thankful to have it while making career transition but it should be expected for development to slow a bit.

---

-- 4 Apr 2024 ---

- Basic implementation for error handling in place with styling.

- Improved on styling for expanded view close button and type copy when user tries to add more than 15 items to their cart.

- Added a touch more drop shadow to menu items hover state.

---

-- 3 Apr 2024 ---

- Styling enhancements for expanded view of menu item.

  - Greater separation between item name and close expanded view button.
  - Enhancement for expanded view font size and spacing for description and title.

- Reimplemented functionality for add to cart button to both close the expanded view and return quantity to default by passing functions as props.

- Styling was not quite what was needed and so updated.

- Menu context provider removed from layout. Is already in providers component.

---

-- 2 Apr 2024 ---

- While working to have not found function correctly with elements of the header I realized my context was not as I wished.
  Getting convoluted and repeating some functionality unnecessarily. Made notes and decided to go back and readdress. Wish me luck.

- Context refactored to encapsulate children in a a providers component. This allows for for more organized components I believe and reduces repeated functionality. Also allows for the elimination of writing the menu categories into session storage.

---

-- 1 Apr 2024 ---

- Refactored context to utilize a consistent naming schema.
- Add to cart resets menu item quantity to default quantity.
- Responsive design improved for menu item expanded view. Now takes into account when ghost div is rendered with size selector.
- Improvements to responsive font size for menu category description.
- CSS class name alter for improved description semantics.

---

-- 28 Mar 2024 ---

- Scrubbed styling of superfluous code and comments.
- Established site color in the body as a variable allowing for easier reusability and maintenance.
- Removed unused modal folder and component.
- Detailed view of menu item card now closes when the add to cart button is clicked.

---

-- 27 Mar 2024 ---

- Improvements to responsiveness of cart quantity badge.
- Improvements to detailed view.
  - Close button fixed in relation to card size.
  - Card min and max sizes established.
- Improvements to 'p' font size for expanded view and category title spacing.

---

-- 26 Mar 2024 ---

- Responsive implementation for logo and loading animation.
- Improvements to responsiveness of menu category descriptions.
- Updated responsive grid styling. Previous implementation was causing menu item names to wrap in an undesirable fashion.

---

-- 25 Mar 2024 ---

- Responsive design work for main header.
- Initialization of work on a 1300px breakpoint. Seeing what breaks and altering.
- Menu sizing for medium devices (< 1300) and general responsiveness.
- Responsive sizing for small devices ( < 800)
- Responsive sizing for xs devices (< 500)

---

-- 22 Mar 2024 ---

- Continuing responsive design for detailed view.
- Have determined responsive design has hit its limit as is and it is time to start utilizing media requests.

---

-- 21 Mar 2024 ---

- Improved on responsive menu design and restored functionality.
- Improved on menu animation.
- Landing page logo position enhanced.
- Loading animation position moved to match.
- Responsive design implemented for menu items category and category description.
- Responsive design implemented for cart quantity badge.
- Responsive design in place for horizontal challenges. Work will continue with vertical.

---

-- 20 Mar 2024 ---

- Responsive design implemented for header and logo.
- Responsive design implemented for menu.

---

-- 19 Mar 2024 ---

- Initiated work on responsive design.
- Gap between header elements now responsive down to a width of 640. Removed fixed position and overwrote div in global.

- Project rebase before continuing styling

-- 15 Mar 2024 ---

- Reimplemented cart quantity badge not being displayed until items are actually in cart.
- Implemented cart quantity limiter with alert message. The idea being to limit opportunities for runaway or mischief order as our owners are currently a cash business. A user is currently limited to 15 items in their order and if more items desired, encouraged to contact the business.

---

-- 14 Mar 2024 ---

- Restyled expanded view of menu item in order to prevent shift when dev tools are up in browser.
- Restyled cart quantity badge for similar reasons and it will remain locked in place until I begin addressing responsive design for the application.

---

-- 13 Mar 2024 ---

- Discovered duplicate menu items folder, it has been removed and references updated.
- Moved button type components to buttons folder in ui component folder.
- Menu icon now has desired behavior of show menu on entry and hiding when use moves cursor somewhere besides menu. Also hides menu when user enters the menu and move off of it with out making a selection.
- Changed expanded view close icon to use standard app font. User feedback indicated the before used custom font was harder to determine what the intended purpose was.
- Reinstated loading animation for menu items.
- Removed unnecessary context items.

---

-- 12 Mar 2024 ---

- Revised styling on menu item expanded view. Still have a few elements running rogue when dev tools brought up but overall experience and aesthetics improved.
- Corrected issues derived from menu item list being brought in as an async function.
- Successfully migrated cart quantity logic into library improving readability of cart quantity component.

---

-- 11 Mar 2024 ---

- Was able to move logic for cart quantity out of nav button inside of its own component.

- Discovered rendering issues were arising as result of where and when call to create cart was currently located and so transported it in to use effect for cart quantity badge. May also move it into main header so that all items dealing with session storage are dealt with at once.

---

-- 7 Mar 2024 ---

- Cart quantity badge styling is updated. Background color matches quantity selected and item size font color when selected. The idea being this color indicating the user did something.

- Updated styling for add to cart button. Active is now set to change color in order to provide feedback to the user that they did add something to the cart.

- Similar styling implemented for quantity selector increment and decrement buttons.

- Animation in place for the cart quantity badge to activate when an item is added to the cart. Still needs to be wired up.

---

-- 6 Mar 2024 ---

- Cart quantity badge is now only visible if items determined to be in a cart. Click add to cart button on a menu item sets items in cart to true.
- Code refactored to reimplement cart as session storage.
- Cart quantity is now reflective of cart stored in session storage, meaning persistence of value for cart quantity is maintained.

---

-- 5 Mar 2024 ---

- Cart quantity badge is in place and accurately reflecting quantity of all items in the cart. Ready for styling.
- Cart quantity badge is styled and ready for further programming.
- Cart quantity badge is now dynamically updating the number of items that should be in the cart based on the users input.

---

-- 4 Mar 2024 ---

- Session Storage holds a TonsOfTacosCart object created at runtime. The idea is to use session storage in order to preserve high frequency state changes for our customers cart in case of browser refresh. This may change over time and make use of Redux or Zustand.

- Cart and its contents will be destroyed upon checkout. Following a principle of unobtrusive data storage for the customer.

- As time and use case progresses we may see a need for creating a session id and storing it on the backend, in order to facilitate if a customer wishes to create an account to facilitate advanced features dow the road such as repeating an order or creating a reoccurring order, or even sharing a favorite order with others.

- Discovered a couple of errors in code and rectified. GetCart and AddToCart are currently functioning as desired.

---

-- 29 Feb 2024 ---

- Created types for cart item and cart in types.d.ts. Created skelton for cart functions in library. The idea is to separate out from actual component to reduce a sense of clutter. Creating a new branch for overlap work between menu items and cart.

- Filled out function for adding a menu item to the cart and session storage. Ready to implement context for passing between components and along with sessionStorage.

---

-- 28 Feb 2024 ---

- Expanded card in place and functioning as desired. Enlarges in order to display a description for the menu item. Expanded version of card dismissed with click of button in upper right hand corner.

- Cart context created. Need order item type creation to begin working with.

---

-- 27 Feb 2024 ---

- Replaced place holders for more/description button and add to cart with buttons in menu item. They are ready for further styling.

- Created icon folder in ui components. Will migrate others there as well. Also will be moving buttons and update styling at some point for modularity.

- Updated styling for pointer cursor opn interactive elements.

- Created conditions for triggering larger card presence. The idea is that instead of being presented as a modal we simply make the card bigger to hold description. Ready for styling.

- Basic styling in place for expanded card.

---

-- 26 Feb 2024 ---

- Context not an appropriate means for managing the state of a menu item as it would be wrapped around all menu items and therefore all menu items would be using the same size state.

- Opted to pass setter down from menu item to size selector and send results back for calculating price.

- Another option would be to bring the button component for the size selector into the size selector component if the prop drilling is deemed excessive.

- Another design option might be to bring menu item into the card component one step earlier and surround that with context before bringing up into menu item list.

- Further options to be evaluated at a later date. Component is functioning as desired at the moment and is ready for a refactor scrub.

- Refactor scrub complete.

- Size selector is now only visible if sizes are available. Utilized state passed to size selector and then conditional opacity as a class in css to achieve the desired result.

- Ready start work on detail view of menu item.

---

-- 23 Feb 2024 ---

- Began work on size selector by tinkering with html and css options. Desired result wasn't quite there. Did some reading and research and came to solution that marries some of what I did with html and css along with other reusable components I had created.

As time goes on I think it will be a strong base for developing a modular solution for larger applications where more radio style features might be needed.

Work ready for a refactor and scrub an implementation of factoring in size options to pricing.

Start with creating a context.

---

-- 22 Feb 2024 ---

- Quantity selector functioning as desired and updates the displayed price in accordance. Ready for refactor scrub.

---

-- 21 Feb 2024 ---

- Size selector styled and ready to programmed.
- Selector placeholder removed.
- Reduced menu item image size.
- Quantity Selector set into its own component.
- Styling for quantity selector moved to its own style sheet.

---

-- 20 Feb 2024 ---

- Altered color scheme slightly for menu items.
- Created styling for quantity selector.
- Increased styling to menu item elements.

---

-- 18 Feb 2024 ---

- Began additional styling of menu items.
  - Increased gap between items.
  - Item name is now an h2 element.
  - h2 styling introduced in global.css.
    - changed color and front size.
  - Added icon image for description/expanded view.
  - Slightly altered timing of loading animation.

---

-- 17 Feb 2024 ---

- Main header is now a server component and calls our menu categories.
- Data passed to nav button and set as a context and kept in session storage.
- Dynamic page now passes slug for desired menu category to the menu item list component and makes item list component where data is mapped for each menu item in the component. This is also a server component.
- Learned a lot in the refactor that should aid in the next steps.

---

-- 16 Feb 2024 ---

- Began refactor process trying to solve for an inconsistency with our food menu items reloading when reselecting the menu button without having selected a new menu category.
- Traced to components encapsulated in the same context component. Will be breaking this larger context provider into smaller ones more task dedicated.
  there will be some overlap concerning menu categories but should be minimal.
- Tracing the issue lead to a much more detailed understanding of Next.js structure.
- Continued refactor still in progress.

---

-- 13 Feb 2024 ---

- Created assets for loading animation and implemented the animation. Requires a little additional tweaking.
- Menu item list currently has a timeout implemented to test loading animation.

---

--- 10 Feb 2024 ---

- Rectified a few styling oddities and created drop down animation for menu nav.
- Upgraded NVM to 18.

---

--- 9 Feb 2024 ---

- Changed menu button from on click to on enter.

---

--- 8 Feb 2024 ---

- Refactored styling modules to eliminate unused code and notes. Moved fonts folder into nested ui folder. Ready for more styling.
- Set main background color to #0c0424. Will need to update the template.
- Set overflow y to scroll. Prevents content shift for now.
- Added transition ease onto various interactive elements.
- Utilized framer motion for loading menu item pages with a smoothed transition.
- Styled scrollbar to match theme.

---

--- 7 Feb 2024 ---

- Worked on styles for our menu item grid,and main nav header. Noticed where styling could be tightened up and made a bit leaner. Also set items to more dynamically align and center with other elements. Ready for refactor to scrub old solutions.
- Next will come fleshing out the menu item cards a little bit more.

---

--- 6 Feb 2024 ---

- Backend team(me ^\_^) finished implementation of adjusting pricing according to size and we should be good to go after looking over documentation. Also altered our code to format pricing correctly.

---

--- 5 Feb 2024 ---

- Reverted to local storage after remembering that desired experience is for a user to be able to head straight to a menu category without having been to the application before.

- Outsourced call to api for menu items to library.

- Removed extraneous notes.

- Sent request to backend team(me ^\_^) to return menu item price in currency format as well as implement functionality for a adding a size to a menu item if applicable and calculate appropriate price.

---

--- 3 Feb 2024 ---

- Supplanted local storage for session storage. Ready for refactor and clean up.

---

--- 1 Feb 2024 ---

- Implemented some persistance through local storage in order to keep moving forward with development. I am earmarking this with a note for a revaluation of obtaining the same desired results through alternative means ie Zustand, perhaps usage of memo or callback other state management libraries.

- In order to achieve persistance for menu categories and category descriptions after a browser refresh, the following was implemented:

  - In the header component we utilize use effect on initialization to call our api and simultaneously set the global context of menu categories and set it in the local storage. By doing this if the browser is refreshed, the header component recalls the api and resets. The context can still be used.

  - If the user is on the menu items pages though and browser is refreshed the required values are not reset before being called and we get a not found page. This is fixed by feeding the required values needed for validation from the values saved to local storage.

---

--- 31 Jan 2024 ---

- Successful implementation of global context for menu categories.

  - Updated context.
  - Updated api fetch.
  - Main header is rendered on loading and interactive and already client component for conditionally displaying nav menu. Therefore set global context for menu categories here.
    - Utilized useEffect() as component can not be async as it is client in order to use global context.
  - Updated menu category list to use categories from global context instead of passed props. Unnecessary props will be removed shortly.

- Successful implementation of dynamically returning category descriptions. Issues here are that on refresh we lose it.
  - Thinking the solution would be to add a menu options to global context and also set in the main header.
  - Possibly also evaluate condition as an async function.

---

--- 30 Jan 2024 ---

- Created new branch to continue on creating contexts. Application currently delivers content dynamically from our backend and through the use of context, but is also passing information through prop drilling. My next goal will be to fetch data on the server side and essentially set it as a semi global context that I can call into different components. Hopefully this eliminate a number of needless calls or prop spelunking. Wish me luck.

---

--- 23 Jan 2024 ---

- Implemented calling api route for menu categories from layout and menu categories are dynamically populated.

  - When link is clicked the menu disappears. This is achieved by implementing a global context to be called in other components.
  - Clicking on a link correctly calls all menu items associated with menu category.

- Push is intentionally a mess so that I can start demonstrating proof of work and conceptualization. Will then clean and pull from main.

---

--- 19 Jan 2024 ---

- Styled out menu category grid of menu items. Basically a ul of cards nested in a section.
- Styling places our grid dead center and gives the appearance of growing outward.
- Implemented means to render menu item name with first letter of each word capitalized.
- Ready to continue styling with a call to get description of category and complete styling of card for changing quantity of a menu item before adding it to cart.

---

--- 18 Jan 2024 ---

- Back-end team(me) implemented our suggestions and so we have made adjustments by renaming our images to correctly reflect menu item names stored in the backend.
- Currently receiving menu items via a call to backend each time the category changes and the component loads. Will be implementing a loading state. As well will be looking into pre-fetching and rendering the data so that it can displayed quicker. Backend calls also to be transferred elsewhere than in component.
- Component ready for styling. Reference wire frame.

---

--- 16 Jan 2024 ---

- Roughed in making call to receive menu items by category from backend and it is successfully doing so.
- Files will need to be cleaned up and notes have been made for future improvements.
- Noticed places for improvement in back-end in order to aide in ease of development by front-end team (me). Have passed along notes to back-end team(also me ^\_^).
- Will be starting a new branch for further development of this feature.

---

--- 15 Jan 2024 ---

- Menu items correctly changing dynamically according to slug input provided either through the address bar or our nav menu.
  - Sample data sets created for each menu item category.
  - Props passed through from hardcoded sample data to our components making up the display of menu items by category.
  - Should be ready to swap out sample data for api provided data and styling.

---

--- 12 Jan 2024 ---

- Placeholders for elements on cards and what data to work with for menu items. Think we're about ready to try and start working with data and implementing props. Will start fleshing out sample data sets a little more after the weekend. Planning to do a bit trial and error before firing up the backend and trying to make a connection.

### Cheers and have a great weekend!

---

--- 11 Jan 2024 ---

- Dynamic route and page basic implementation in place.
  - Slug is captured and validated. Not found page in place to catch invalid requests. After validation switch is set up to change what dataset is used pertaining to what menu items are displayed.
  - Component is currently returning placeholder elements that verify dynamic functionality.
- Noticed places for improvement in backend and will be opening issues in project for addressing.

- Created basic files for creation of a menu item, the card it will go into, and the menu item list all menu items will be fed into.

---

--- 10 Jan 2024 ---

- Updated styling for food menu nav. Is now aligned with our header border and the colors for link text and hover match the rest of our theme.
- Worked on creating dynamic route for menu items by category. Involves capturing the slug through params and setting that as the menu item category requested. Next steps will include using the aforementioned steps to return desired sample data.

---

--- 9 Jan 2024 ---

- Began cleaning up styling and working on styling for menu nav component.
- Menu nav component initialized and state of its button utilized.

---

--- 8 Jan 2024 ---

- Added to global styling for h1 elements.
- Created basic files for menu navigation based on menu item category (tacos,drinks,sides,toppings).
- Created basic pages for menu.
- Created basic image gallery file for menu items.

---

--- 7 Jan 2024 ---

- Brought in icon images in svg format for manipulation of various properties.
- Created icon components to bring into main header and styled.
- Refactored and cleaned up main-header page and css file.
- Replaced default icon with our fictional companies logo.
- Will begin work on buttons and nav next.
- Fixed image links in dev journal.

---

--- 6 Jan 2024 ---

- Began work on header and styling.
  - Header is a central component for navigating menu items and cart.
- Brought in fonts through use of importation and global css. So far a bigger fan of creating font faces in css. reads cleaner in the main page.
- Updated icons for cart and menu in order to fit main font theme a little better.
- Continued build out for main page and menu to be continued next.

---

--- 4 Jan 2024 ---

Started off new year with completion of a quick next.js refresher and beginning work on the front end.

- project initialized and example scrub.
- created images folder and loaded up with menu item images.
- created a components folder.
- created error and not found pages.
- began throwing in placeholders for styling.
- Updated README.

Off to the races!

---

--- 1 Dec 2023 ---

- Created site design mockups using logos and color schemes. See below.
- Gathered and resized images to be used with our menu items.
- Initialized Next.js application in front-end folder.
- Will start get images into public asset folder and then update backend with correct paths for the images.

### Sample Mock Ups For Consideration

<p align="center">
  <img src="./media/bird-design/main-page-mockup.png"/>
</p>

<p align="center">
  <img src="./media/temple-design/mainpage-mockup.png"/>
</p>

<p align="center">
  <img src="./media/ton-design/mainpage-mockup.png"/>
</p>

---

--- 13 Nov 2023 ---

Spent time refining logo designs (included below).

Next steps to include:

- landing page mockups
- gathering and formatting remaining menu item images

<p align="center">
  <img src="./media/bird-design/bird-logo-revised-comparison.png"/>
</p>

<p align="center">
  <img src="./media/temple-design/temple-logo-comparison.png"/>
</p>

<p align="center">
  <img src="./media/ton-design/ton-logo-comparison.png"/>
</p>

---

--- 10 Nov 2023 ---

- Created wire frame demonstrating action to add a menu item to cart. More or less created to demonstrate knowledge of design life cycle and demonstrate how I might convey that information to others. I may create more for additional actions as time allows in the future but am chomping at the bit to get moving on development.

<p align="center">
  <img src="./media/wireframes/add-item-to-carta.png"/>
</p>

---

--- 3 Nov 2023 ---

- Began creating color templates, logo concept art, and wire frames. Below are a few samples. Will begin work on wire frames for task flows (ie. Selecting menu items and submitting an order, owner login and various tasks.) next.

<p align="center">
  <img src="./media/logo-collection.png"/>
</p>

<p align="center">
  <img src="./media/theme-layout.png"/>
</p>

<p align="center">
  <img src="./media/wireframes/general-layout.png"/>
</p>

---

--- 25 Oct 2023 ---

- Git project updated with notes for specific tasks. Will be focusing on asset collection for a bit.

---

--- 24 Oct 2023 ---

- Initialized frontend development steps and plan. Saved to my notes.

---

--- 23 Oct 2023 ---

- Frontend application initiated.

---

--- 17 Oct 2023 ---

- Application files scrubbed for outdated code and comments.
- Test files scrubbed for outdated code and comments.
- ERD updated.
- ReadMe updated.

---

-- 10 Oct 2023 --

Had a drive fail and lost a bit of work but was able to get drive cloned and then utilize git to repair damaged files merged from a cloned drive. Both drives appear to be synced and operational and program is chugging along. Next steps will include a cleanup from the file repairs.

---

-- 5 Oct 2023 --

- tests refactored and improved upon.
- noticed double data type utilized in application to describe currency variables. Updated to utilize big decimal instead for precision.

---

-- 3 Oct 2023 --

- Application wide refactor mostly focused on eliminating outdated comments and commenting out print lines in order to reduce noise. Commented out instead of eliminated as I appreciate not having to completely rewriting the line when trouble shooting is required.

---

-- 25 Sep 2023 --

- Updated all endpoint documentation for swagger with more detailed instructions and examples.
- Began work on tests with Mockito. Utilizing the framework to mock null instances of calls to the database and ensure global exception handler is operating as desired. These tests will serve as a refactor and replacement of earlier tests.

---

-- 13 Sep 2023 --

- Discovered bug linked to not enough variation in path names to differentiate between searching for a customer or order by uid or customer name. Appears to be remedied by adding uid or name to the paths concerned.

  (ie "/get-order-uid/{orderUid}", "/get-order-customer/{customer}")

---

-- 11 Sep 2023 --

- Updates to owners tools pertaining to customers for increased validation.
  - edit customer phone number updated.
  - edit customer name updated.
  - edit customer email updated.
  - delete customer updated.
- Updated tests for get all customers, delete customer by uid, get customer by uid, get customer by name, update customer email, update customer phone.

---

-- 10 Sep 2023 --

- Refactored dtos to exclude entities id in favor of uid and for returned order to utilize uids in lieu of ids.
- Updated owners tools customers requests to make use of uids.
- Encountered a bug while returning customer by name that appeared to stem from endpoint paths too similar to looking up a customer by uid. Rectified through alteration to naming convention.

---

-- 06 Sep 2023 --

- Delete order tests updated to make use of order uid.
- Edit order item quantity tests updated to make use of order uid.
- Work on get order by id tests saved and removed from application as we will no longer be using them.
- Today's sales tests updated to make use of order uid.
- Order closed tests updated to make use of order uid.
- Order ready tests updated to make use of order uid.

---

-- 05 Sep 2023 --

- Mark an order as closed changed to use uid instead of id successfully.
- Delete an order changed to use uid instead of id successfully.
- Add to order changed to use uid instead of id successfully.
  - tests updated and functioning correctly.
- Update order item quantity.
- Addressed an issue with 404 not returning a satisfactory message.

---

-- 04 Sep 2023 --

- Initialized refactor of order endpoints to use the order uid in lieu of the order database index as a parameter for searches and alterations by the owner.
- Mark an order as ready changed from id to uid successfully. Will continue on with additional changes.

---

-- 03 Sep 2023 --

- All menu item endpoint documentation updated with examples of successful requests and responses. Documentation formatting updated.

---

-- 02 Sep 2023 --

- All owner endpoint documentation updated with examples of successful requests and responses.

---

-- 29 Aug 2023 --

- Updating docs with examples of successful request responses.
- Updated calling an order to include the uid in lieu of id.

---

-- 23 Aug 2023 --

- Updated documentation for owner tools pertaining to orders.
- Updated documentation for owner login.

---

-- 22 Aug 2023 --

- Updated documentation for orders endpoints.
- Updated documentation for owner tools pertaining to customers.

---

-- 21 Aug 2023 --

- Application updated for open api 3.0.
- Began updating docs.
- Updated documentation for menu endpoints.

---

-- 18 Aug 2023 --

- Logger set up and operating and currently operating as desired. Notes made for potential future implementations.
  - Appender for debug and one for errors.
- Issues updated and resolved in github.

---

-- 8 Aug 2023 --

- Implemented a basic logger for exceptions of interest. Refinement in progress.

---

-- 6 Aug 2023 --

- Refactor for security, exception handling, applicable tests and dtos in good place.
- Beginning implementation of logging exceptions with logback.

---

-- 1 Aug 2023 --

- Refactored for 401 responses for bad login attempt or trying to send request with fabricated payload.
- Removed a validation check that was hindering auth filter.
- Next steps will include a refactor of security files to remove redundant comments or theoretical code.

---

-- 26 Jul 2023 --

- customer to be refactored to include a uid.
- exception handler to ensure bad credentials throw a 401 and expired or bad tokens throw 403.
- ***

  -- 24 Jul 2023 --

- refactor of ownersServices customers and orders complete and tested.

---

-- 14 Jul 2023 --

- refactor of config folder executed and tested, still need annotation
- refactor of controllers folder executed and tested, still need annotation
- refactor of dao folder executed and tested
- refactor of dtos with new names executed and tested

---

-- 11 Jul 2023 --

- Encountered oddities while running test cases through postman in exception handling for un-found menu item entities. These have been resolved.
- Junit tests performing as expected for exception handling.
- Application test run through postman successful.
- Commencing clean up and refactor.

---

-- 6 Jul 2023 --

- Currently all 44 tests for input and output validation operating as expected for all current customer and owner functions. Whew!
- Next will be quick run through with postman to verify user experience followed by a refactor and clean up.

---

-- 5 Jul 2023 --

- Test for daily sales through postman reveals logic errors. Needs to be evaluated further.
- Need to edit response successful deletion of an order. Currently returning void.

---

-- 4 Jul 2023 --

- mark order ready and mark order closed refactored to return order dto.
- Moving onto daily sales. Dto to be created, returned and verified. Test will include marking two orders ready and closed in order to test calculations.

### To all that remains of freedom and liberty.

---

-- 3 Jul 2023 --

- Negative test case for attempt to close an order with an invalid order id complete.
- Negative test case for attempt to close an order before the order has been marked ready complete.

---

-- 2 Jul 2023 --

- Negative test cases for editing an order item quantity complete.
- Negative test case for no orders returned complete.
- Negative test case for calling an order by a bad order id complete.
- Negative test case for calling an order by an invalid uid complete.
- Negative test case for calling an order by an invalid customer name complete.
- Negative test case for attempting to change order status with invalid order id complete.
- Positive test case for closing an order complete.

---

-- 29 Jun 2023 --

- Completed validation for adding an item to an order, handling an exception and tests for negative use case.
- Completed validation for deleting an order, handling an exception and tests for negative use case.
- Began validation for editing an order item. Still need test for changing quantity to zero and being removed from the order .

---

-- 28 Jun 2023 --

- Completed validation for adding an item to an order, handling an exception and tests for negative use case.
- Completed validation for deleting an order, handling an exception and tests for negative use case.
- Began validation for editing an order item. Still need test for changing quantity to zero and being removed from the order .

---

-- 27 Jun 2023 --

- Previously mentioned bug appears to be just that. Tried printing caught exception from repository and then commented it out and then new exception properly thrown and picked up. Seems a tad bizarre.
- Completed negative test cases for updating customer email.
- Completed negative test cases for updating customer phone number.
- Bug now appears to be as a result of needing to be instantiated (ie in the call to print customer) before the exception is thrown.
- Tests for owners functions pertaining to customers completed including validation.

---

-- 26 Jun 2023 --

- Implemented new tests for bad test cases for all owner functions relating to customers except update email and phone.
- Something bizarre with trying to call the repository to verify a customer id. Like it didn't close the connection properly.
- Will investigate further.

---

-- 20 Jun 2023 --

- Implemented new test for bad test case for delete customer by id.
- Implemented changes to get all customers for a more thorough test.

---

-- 19 Jun 2023 --

- Completed test for request sent with jwt containing invalid subject.
- Next phase will include verifying that all tests have a negative test case with expected exceptions thrown starting with delete customer by id.

---

-- 13 Jun 2023 --

- Began laying new jwt validation tests.
- Confirmed that if token expiration is before issued at jwt expiration exception thrown. Same as other test case where date is fixed as expired.
- Next will test where username or signature are invalid.

---

-- 12 Jun 2023 --

Something odd has taken place. Application and all tests were functioning as desired but something changed recently causing bearer token to not be generated so need to go back and and start at the root before further progress can be made towards testing for proper exception handling of bad jwts.

- Research reveals one version of auth filter allows for successful token creation but not allowing for successful error handling, the other version allows for error handling but not successful token creation.

- Removal of :

        assert expiration != null;

        if (!issuedAt.before(expiration)){
            throw new JwtException("invalid date") ;
        }

Appears to have rectified the issue.

- I believe the next endeavors will include cloning aspects of the jwt class in for our other test cases.

---

-- 7 Jun 2023 --

Still experimenting with where I want to catch certain errors and what makes most sense but completed test for an expired jwt. Next test will be for a jwt that isnt yet expired but the expiration is before the issued at.

---

-- 6 Jun 2023 --

Finally broke through. Moved auth filter in security config to the top of the stack, implemented suggestions from Nicolas Francisco Corvi and additional documentation to incorporate a Handler Exception Resolver, and also added a lombok config file in order to make it work.

Excited for this step and looking forward to the next.

---

-- 2 Jun 2023 --

- Bit stumped on getting global error handler to pick up exceptions related to jwt validation. Have submitted a question on stack trace to see if I can get more info from development community et al.

- Next attempts to include experimenting with catching the exception in a service layer, mostly out of curiosity.
- Continuing on current trajectory of customer exception for each jwt use case(seems inefficient in theory but seems to be best chance so far)
- As well, will re-attempt authentication entry point implementation and creating a returnable error response.

---

-- 29 May 2023 --

- Exception was being handled though not correctly. New efforts have demonstrated a more desirable result. Error code is correctly returned as well as the ability to manipulate the response into a useable message. This is not yet the full desired effect of having the exception picked up and handled by the global error handler. Morning research has brought me the following resource for further research.

https://github.com/erickrodrigs/musicflux/commit/c247e7f9212560c5f3e19c5b8667d7e97e22309f

---

-- 24 May 2023 --

- Research indicate jwt exceptions are coming from filter which is why the global error handler established is so far unable to pick up and handle the exception. Have been looking over other developers solutions and believe I may have located a jumping off point for a solution.

https://stackoverflow.com/questions/34595605/how-to-manage-exceptions-thrown-in-filters-in-spring

---

-- 23 May 2023 --

- Narrowing down relationship between jwt auth filter and extract all claims method. Specifically parseClaimsJws needs more understanding. Application is currently correctly throwing an expired jwt exception for our test data and returning a 403 but our exception is not currently being appropriately handled and returning useful information to the front end.

---

-- 22 May 2023 --

- While working through validating tokens it has been discovered that signature exceptions are being thrown but not handled. Research has lead me to the auth filter. I will be focused on this for a bit trying to achieve desired results. So I am currently advising to consider the auth filter a mess until further notice while tearing it apart and putting it back together. ^\_^.

---

-- 18 May 2023 --

- Began laying out procedures for tests concerning owner functions.
- Also need to take a look at when tests are run in succession there is a repeating pattern of 1 fail and two pass, 2 fail and one pass, and all pass. This behavior appears to mostly originate in the bad password test. My hunch is that something is related to the random chars created for encryption.
  - Will look into excluding specific chars. Will start with (", ^, <, >).

---

-- 17 May 2023 --

- Test case for an unsuccessful login attempt with a bad username returning a 401 successful and in place. Seems to be a spring bug with a fair bit of history. Solution came from research and after attempting multiple possibilities. The following dependency resolved the issue.

      	<groupId>org.apache.httpcomponents.client5</groupId>
      	<artifactId>httpclient5</artifactId>
      	<version>5.2.1</version>
      	<scope>test</scope>

- Nest step will be replicating test for a correct username but bad password.
- Bad password test successfully tests for 401 and error message contains the appropriate fields.

---

-- 16 May 2023 --

- Invalid credentials test is accurately looking for whatever response code is determined. Currently application throws a 403 if login fails and desired effect is a 401 for a bad login and then a 403 if a user was to say try and access a function with a bad jwt. Will attempt try catch at auth service for resolution.

---

-- 15 May 2023 --

- Continuing with bad login and validation tests.

---

-- 11 May 2023 --

- Began laying out negative test case for login endpoint.

---

-- 10 May 2023 --

- Updated createOrder() to reset validation flags after an order is saved.
- Updated database and entity to use status instead of closed as a data column for an order. Should make data more digestible. By default status is set as "open" and when order is closed will now read "Closed : + timestamp".
- Create order tests reformat completed at the moment.

---

-- 9 May 2023 --

- Order validation refactored for a clean up and integration test for negative test case operating as expected.
- Valid order test refactored for updated validation and is successful.
- Cleaned up code and comments in auth service, order creation test, and jwt service.

---

-- 8 May 2023 --

- customer email validation in place.
- test correctly returns 400 bad request if customer name, phone number or email invalid.

---

-- 4 May 2023 --

- validateCustomerName method implemented and functioning as intended.
- validateCustomerPhoneNumber method implemented and functioning as intended.

---

-- 3 May 2023 --

- Valid order test updated as well as orders service incorporating validation for a customer name.
- Research lead to regex solution from user Nick Sikrier on stack overflow https://dev.library.kiwix.org/content/stackoverflow_en_nopic_2021-08/questions/15805555/java-regex-to-validate-full-name-allow-only-spaces-and-letters.

  - solution as  ^\\p{L}+[\p{L}\p{Pd}\p{Zs}']\\\*\p{L}+\$|^\p{L}+$

    - ^\p{L}+ &nbsp; - &nbsp; It should start with 1 or more letters.
    - [\p{Pd}\p{Zs}'\p{L}]\* &nbsp; - &nbsp; It can have letters, space character (including invisible), dash or hyphen characters and ' in any order 0 or more times.
    - \p{L}+$ &nbsp; - &nbsp; It should finish with 1 or more letters.
    - |^\p{L}+$ &nbsp; - &nbsp; Or it just should contain 1 or more letters (It is done to support single letter names).

- My addition and incorporation simply adds converting our received customer name from the order, converting to a byte array and counting how many spaces. So if the name format doesnt match regex or has too many or not enough spaces it will not be valid. Nick's above regex allows any letter in any language and may be overkill for our little local food truck, but thought it might be nice to have the option. To be evaluated if issues arise.
- The idea being that front end should receive customer first and last name trimmed and then concat with a single space in between. Will be noted in the documentation.
- Added skeleton methods to order service to hold validation means for an order in order to help increase readability.

---

-- 2 May 2023 --

- Created test for negative use case of creating and verifying validation is operating as desired.

- Fine tuning regex.

---

-- 1 May 2023 --

- Validation in place for returning a menu item by id, or menu items by category. Tests updated for positive and negative use cases.
- Initialization of laying out validation for creating an order. Most likely evaluating that each field for customer is not null and of valid type, as well as ensuring order is not nut and the total is reflective of the cost of each item in the order.

---

-- 27 Apr 2023 --

- Quite possibly found my solution through simple creation of a body field returned in create message field. The actual error itself will be logged through the creation of a log method called in the error handler.
- Error handler updated for number format exception and entity not found exception.
- Menu item test successful for positive and negative use test cases.

---

-- 26 Apr 2023 --

- Development has slowed dramatically due to returning to old job in order to pay bills while trying to change careers.
- Working at trying to create a more detailed form of feed back for front end development when an exception is encountered.

---

--- 21 Apr 2023 --

- Appear to have rectified algorithm for random Uid generated on order creation
- Create order gives us a return order dto for order confirmation.
- Test successful however dtos were not being set correctly for response message but now are.
- Test is satisfactory.
- Order generates uid correctly on order creation.

---

-- 20 Apr 2023 --

- Beginning implementation of generating a random uid for an order on checkout.
- Trying for a smaller number so easy to read and repeat to customer or owner.

---

-- 19 Apr 2023 --

- Tests functioning as desired after encryption implementation for both username and password. This would indicate a means for protection from MITM. Algorithm can always be improved.
- Encryption algorithm keys moved offsite.
- Development code cleaned and saved offsite to my files for proof of work if requested but so that old algorithm views are not sitting waiting to be picked up.

---

-- 18 Apr 2023 --

- Basic implementation of encryption and decryption created
- Discovered char being generated causes issue with json string
- Research into random int generation with exclusions
- Random char method updated to compare generated random with a list of excluded
- Test for jwt creation with encryption successful
- Majority of program expected to be broken until full integration.

---

-- 17 Apr 2023 --

- Encryption research.
- Basic operable functionality written out in separate file.

---

-- 13 Apr 2023 --

- All patch methods updated to put. Spring, Java, Modern Http... ><
- Orders tests successful carrying out protected functions for owners.

---

-- 12 Apr 2023 --

- Created successful test for generating token and that it is valid.
- Research on JWt(JWS) continues and brings much to contemplate.
- Jwt now integrated now integrated into unit tests for owners tools customers functions. Successful test cases positive.

---

-- 10 Apr 2023 --

- Test db updated.
- Began writing unit tests for successful owner login function.
- Base Uri implemented.
- Test body created.
- Test asserts correct status code for successful call to login endpoint
  - Currently working through logic for verifying that an appropriate jwt is returned.

---

-- 6 Apr 2023 --

- Refactored files pertaining to security.
- Functionality tested in postman.
- Mapping out integration tests and means for token refresh and invalidation of token.

---

-- 5 Apr 2023 --

- Corrected circular dependencies.
- Application is correctly locking off desired endpoints and granting access if a valid jwt accompanies the request in the header and is only created if entered credentials for the owners match in the database.

---

-- 4 Apr 2023 --

- Jwtauth filter in place for validation by user name and date.
- Refactored -> past implementation generated token but would token was not accepted. Possibly due to time lited in postman vs. the amount of time before expiration.
- Current state creates toke. It is apparently accepted with a 200 but further testing is required still as we are no longer receive the expected objects back in postman accessing the secured endpoint.
- Returning a 200 for the token passing the filter but request not continuing on past to the endpoint. Next will include feedback for each step and comparing passing nothing and passing everything.

---

-- 3 Apr 2023 --

- Implemented jwt dependencies.
- Created controller and controller interface for login.
- Created ownerAuthDto.
- Created JWT Service and Jwt Service interface.
- Document where security config came from.
- Chain of actions so far
  - Hit controller and call service >> call generate token and pass username >> gen token calls create token >> create token sets the sign key, issues at, expires at, subject and claims.
- Currently returning a token through postman if creds correct.
- Have removed form login as we were mostly just receiving 302s for the spring redirect when hitting our endpoint for the login form.
- Currently receiving 403s though browser and postman.

---

-- 31 Mar 2023 --

- Application updated to Spring 3.0.01 in order to implement spring 6 and the latest features of spring security.
- After studying multiple tutorials online and learning what changed I am pleased to have an in initial implementation up and running.
- DB updated to include a user roles column for our owners table.
- Owners passwords were encrypted and fed into the tables on execution of sql script.
- Created security config in config package.
- Implemented beans for user detail service, filter chain, password encoder, authentication provider.
- Touched up owner entity and implemented user details in order to remove the need for an additional class.
- Created Owner repository and method for finding owner by username.
- Created the user details service in a new package under services package.
- End-points successfully tested in browser after logging in.
- Repo will be updated after more work and potentially sensitive information in the code secured.

---

-- 30 Mar 2023 --

- Broke out owners-tools controllers and services to owners-tools/orders and owners-tools/customers.
- Further testing demonstrated an error in calculating daily sales.
  - Refactored DB from status column to closed column in order to replicate function of ready column. ie(default no and then when changed logs time).
  - Refactored method in orders repository to find order by closed.
  - Refactored close order method in OwnersOrdersService and daily sales method.
  - Updated logic of daily sales to reflect changes.
    - Test successful.
- Base test uris updated for owner functions relating to customers.
- Customer test classes created.
- Successful test for deleting a customer from db.
- Successful test for getting all customers.
- Successful test for get customer by id.
- Successful test for update customer name.
- Successful test for update customer email.
- Successful test for update customer email.

- Discovered assertThat() not necessarily allowing tests to fail. Dove into the Assertions class for solutions and appear to have rectified the past issue.

### Initial tests for owners functions pertaining to customers in place!

---

-- 29 Mar 2023 --

- Successful test for getting an order by id.
- Successful test for deleting an order by id.
- Functionality for owner to add a menu item to an order implemented.
- Functionality for owner to edit an item on an order implemented.
- Successful test for editing an item on an order.
- Successful test for adding an item to an order.
- Successful test for returning days sales and verifying the equal a summed total of orders
  marked closed in the db.

### Initial tests for owners functions pertaining to orders in place!

---

-- 28 Mar 2023 --

- Added verification clause to order created test by immediately retrieving the created order from db.
- Successful test for owners to retrieve an order by order uid.
- Successful test for owners to get all orders.
- Successful test for retrieving open orders by customer name.
- Successful test for marking an order ready.
- Successful test for marking an or order closed.
- Test case for marking an order closed exposed a bug where orders were unable to be called after being marked closed.
  As customer id field was null the requirements were unfilled for creating the necessary dto. This was fixed by setting a default null value for the
  fields of interest. If the incoming order has null for a customer id then there is no point in setting the fields and the requirements of the dto are satisfied.

---

-- 27 Mar 2023 --

- Determined means for obfuscating customer details.
- More time spent researching hashing data for owner auth will work on it more after initial tests successful with restructure.
- Refactored reflecting structure change and removed unnecessary tests though their frames may be utilized in future contexts.
- Menu item tests successful
- Order creation test successful.

---

=======

-- 21 Mar 2023 --

- Customer and order saved in same transaction.
- Customer may place an additional order while past order is still open, eliminating duplicate customer entries.
- Upon closing last open customer order, customer information removed. Ensures information not in use is not sitting idly waiting to be exploited.
- Began work on securing owners tools endpoint.
  - Created owners table and loaded sample data.
  - Created owner entity and respository.

---

=======

-- 20 Mar 2023 --

- Get customer dto refactored for the desired use case and function is currently operating as desired.
- Implemeneted returning a customer by customer name.
- Implemented returning a customer by id.
- Implemented updating a customers details.
- Implement customer delete a customer without deleting orders associated to them so that information can still be used for accounting purposes.

- Refactor notes:

  - Removed unused code and comments app wide due to relocation of functionality between order item, orders and owners.
  - Relocated order item dto converter to orders service.

- Began combining order and customer dto into a new order dto that more closely reflects what the order object will consist of.

- refactor notes
  → removed unused code and comments app wide due to relocation of functionality between order item, orders and owners
  → relocated order item dto converter to orders service

  =======

  -- 17 Mar 2023 --

- Get customer dto refactored for the desired use case and function is currently operating as desired.
- Implemeneted returning a customer by customer name.
- Implemented returning a customer by id.
- Implemented updating a customers details.
- Implement customer delete a customer without deleting orders associated to
  them so that information can still be used for accounting purposes.

---

-- 16 Mar 2023 --

- Return order by uid for owners implemented.
- Return open order by customer for owners implemented.
- Get the days sales migrated to owners endpoint.
- Mark an order ready migrated to owners endpoint.
- Ability to delete an order by id migrated to owners endpoint.

---

-- 15 Mar 2023 --

- Controllers restructured to share the orders endpoint.
- Order can be edited to add an order item and order total is adjusted.
- Order item can be edited to change quantity and order item total and order total is adjusted.
  - If quantity = 0 the item is removed from order and the order total is adjusted.
- Functions reduced from order item controller as they are now implemented through orders controller
- Began creating packages for functions specific to owners, ie returning entities instead of DTOs so that they are able to have ease in manipulating data.
- Created owners controller, service, and dto layers.
- Implemented owners getting all orders in conjunction with their customized dto.

---

-- 14 Mar 2023 --

- Implemented sales endpoint which tallies number of completed sales and total for the current day for owners use.
- Implemented deletion of an order.

---

-- 13 Mar 2023 --

- Return order by uid implemented.
- Create order now correctly generates totals.
- Restructured get-order endpoint to be searchable by uid or customer name.
- Return order by customer name implemented.
- Order able to be marked with a time ready.
- Order status can be marked closed to indicate an order is complete.

---

-- 9 Mar 2023 --

- Status column added to orders.
- New erd available.
- Json syntax for creating order figured.
- Initial test for creating an order successful.
- Ready column added to orders.
- get orders returned to working off of dto, stills needs to be cleaned.
- New erd available.

<p align="center">
  <img src="./back-end/supporting-files/erd-09Mar2023.png"/>
</p>

---

-- 8 Mar 2023 --

- Setting up dto for order response. Interested to see if this will solve recursion as we will be wanting to work with dto most likely anyways.
- Dto implemented and relationships currently behaving as expected.
- Next steps will include implementing tests, and reformatting database to include a column for status with a default value of open, and to be changed manually to closed after customer pays and picks up food by tons of tacos owners. May need to also include field for contact details but they will be encrypted. To be worked on at a later date.
- test sql scripts updated
- Initial Test for all orders returned successful.

---

-- 7 Mar 2023 --

- Checkout endpoint initial implementation successful.
- Changing cart implementation to be conducted from front end and lighten server load. Not that this app should be undergoing a heavy rush but logic and research seems to suggest this is the way.
- SQL scripts updated.
- Refactor implemented.
- Initial test for getting all orders and their associated values through postman successful.
- Will get a new erd up soon.

---

-- 6 Mar 2023 --

- Branch schema changed where I will just stay on a branch for all work pertaining to in lieu of jumping back and forth to tests and end points branch. Please note development there has stopped and is continued on other branches.
- orders controller interface implemented.
- orders dto created.
- created packages and initial files for orders tests
- first function for endpoint currently operating as intended.

- Initial files for orders created.

---

-- 5 Mar 2023 --

- Updated order item entity to cart item as it better describes the purpose.
- Order controller interface implemented with swagger for documentation.
- Branch schema changed where I will just stay on a branch for all work pertaining to in lieu of jumping back and forth to tests and end points branch. Please note development there has stopped and is continued on other branches.

---

-- 3 Mar 2023 --

- Remove cart item tests successful.
- Create order item no longer returns the item added to cart in a response so that selected items remained cloaked. May be overkill or create other issues down the road. If so check there.
- Console messages created for verification of reaching service, controller and action completed.
- Order item tests functioning as designed.
- Code reformatted, cleaned up and ready to start working on orders.

---

-- 2 Mar 2023 --

- Successful tests for utilizing dto to return list of order items with 200 and
  if uuid not valid returning 404.
- Created dto for returning order items with specified parameters, tests successful.
- Updating cart tests successful.
- Composite indexes may be the key to what I was originally envisioning for link between order items and order item. Will take much more research and time.
- The two previously mentioned tables are no longer linked and sql scripts have been altered.

---

-- 28 Feb 2023 --

- initial order item response formatted.
- test with dto successful and good data for cart successful.
- test with dto and bad data for add to cart successful.
- total is now auto generated when an order item is created based on order items base price and the quantity selected.

---

-- 27 Feb 2023 --

- Now using HSQLDB as in memory for testing, way to many issues with H2 being restrictive and not truly modeling database.
- All tests successfully functioned from returned non linked entities.
- Established succesful relationship between order items and menu items with jpa.
  Still lots of work to be done formatting the data.
- Began Implementaion of dto for order items. New tests to be written as progress made.

---

-- 23 Feb 2023 --

- Successful test that order item is deleted with a 200 status code
  and cannot be deleted again because it can not be found because it has been deleted.
- Successful test for order item not deleted if order item id invalid.
- Implemented deleting an order item if if quantity is zero and tests verify desired functionality.
- Re-instantiated orders and customer entities.

---

-- 22 Feb 2023 --

- Get order items by uuid completed including handling bad input.
- Restored update quantity function to service and controller.
- Restored delete order item function to service and controller.
- Created successful test order item quantity is updated as well as order item total.
- Created successful test to return 404 if order item does not exist.

---

-- 21 Feb 2023 --

- Revised create Order Item tests to produce desired and satisfactory results for successful and unsuccessful scenarios.
- Began structuring tests for getting order items through a common uuid.

---

-- 20 Feb 2023 --

- Working through customer and order endpoint correlation, logic, and encryption.

---

-- 16 Feb 2023 --

- initial logic of testing if all order item fields are valid completed.
- need to possibly redefine test order item through a builder instead of json string values.
- right now cant compare as the database is in memory and closes after writing to the db so trying to read if value is valid against the repository is mute.
- need to refine regular expressions and test again after return from break.

---

-- 15 Feb 2023 --

- completed test for returning menu items by category.
- properties files split out between application and test.
- tests for successful call of menu items by category and unsuccessful call created.
- documentation updated.
- began piecing order endpoint back together including testing operation for a successful addition to a cart.

---

-- 14 Feb 2023 --

- Getting menu items by id tests completed and began organizing tests for getting menu items by category.
- Documentation to follow.

---

-- 13 Feb 2023 --

- Test environment refactored for full function of in memory h2 in order to preserve db image.

- Menu item endpoint restored and tested for calling a menu item by id number successfully. Will test for a 404 and 400 next.

---

-- 10 Feb 2023 --

- test env config restored.
- connections and base endpoint functionality re-established.
- turned off default exposure through config file.
- menu controller back online.
- order controller back online.
- all endpoints functioning as desired.
- tested in browser and postman.
- next will be error handler integration and unit testing for each endpoint and feature.
- updated erd below. Clockwise cascade.

  &nbsp;

<p align="center">
  <img src="./back-end/supporting-files/erdV1.2.png"/>
</p>

## &nbsp;

-- 9 Feb 2023 --

- Initial refactor complete. Means for adding a new order item to the database restored. Meaning that it should be feasible to create a cart. From the front end.
- Test environment scripts need to be restored however as they appear to be belly up at this point. Lots learned through the process.
- Also created new erd that represents changes. Will work on getting it up tomorrow.

---

-- 8 Feb 2023 --

- Started coming across abnormalities while conducting tests and so spent the day refactoring. Hoping the end result is for the better.

---

-- 7 Feb 2023 --

- DB refactored. Table 'order_item' is now 'cart' as this better reflects its purpose.
- Initial completion of update quantity of a cart item. Also updates the total.
- Initial completion of remove cart item. Needs some refactoring to reflect the new schema but methods were all tested and functioning in the browser and posted before changes made.
- Full crud functions for cart!

Lots to do still but starting to see light. Updated to do list.

---

-- 6 Feb 2023 --

- Refactored order item controllers and services.
- Refactored packages for organizational purposes.
- Began working out logic for updating a menu item.
- Updated documentation for menu item and order item controllers.
- Will be refactoring data structure in future. Order items will become cart items as this is more descriptive of what is actually happening.
- Order item endpoints test in browser and with postman for desired functionality. Tests will be written with JUnit following establishment of remaining endpoints for crud functionality of cart items.

---

-- 3 Feb 2023 --

- Refactored menu item controllers and created services that now provides desired functionality of shorthand or jpa search.
  -Refactored Controller naming convention .
- Working on functionality of order/cart item in regards to crud operations and then transferring to an order with making these end points open for queries. Will resume next week.

---

-- 2 Feb 2023 --

- added jira project - need to research issue keys.
- updated read me to include purpose of application and link to dev journal.
- created endpoint for creating orders and order items.
- created test for 201 response upon successful creation of order item.
- tested endpoint with valid data in postman.
- cleaned up tests.
- created controller and documentation for order endpoint.
- cleaned up config file.

Tomorrow's goals

- Refactor Controllers.
- Continue Crud Operations for order items.

---

-- 1 Feb 2023 --

- Built global error handler for future implementation.
- Began fleshing out functionality to be associated with adding items to a cart.
  - In summary:
    - click on item >> order uuid is generated >> relevant information is written to DB for the purpose of populating a cart for customer to alter and observe.
    - On checkout >> uuid and cart will clear after using the data in the cart to create an order and write to DB.
- Created order item controllers and repository classes.
- Refactored database based on needs new phase will bring.
- Update project on GitHub.

Tomorrow's goals

- Start project management with Jira.
- Update README description.
- Begin work on controllers and and tests to facilitate writing order items to DB.

---

-- 31 Jan 2023 --

- Test built for creating a new menu item for when that feature is implemented for the owners.
- Test built for getting menu items by category.
- Sprint concluded on target.

Tomorrow's goals

- Build error handler.

---

-- 30 Jan 2023 --

- Re-organizing menu item test for http responses.
- Organizing ideas on migrating menu item to order item.

---

-- 27 Jan 2023 --
Not as far as I wanted to get today but I'll take the small victory.

- Created test for retrieving data and comparing it against an expected set of data.
- Also tested for proper response code from the query.

---

-- 26 Jan 2023 --

- Created a configuration that works for testing in memory as well as against the actual database.
- Successfully created a test to create a new item in the database. I am not completely pleased with it however and intend to do some more work on it. Right now we create an entity to send through a constructor but I would like for the data to come from a builder instead.

Tomorrow's goals

- Try and complete means for full crud testing with in memory database.

---

-- 25 Jan 2023 --

- Revealed entity ids in order to aid in ease of working with data with method constructed in rest config
- Refined test for CRUD operations against the data base.
- Calling items by category will remain as simply a query on our menu-item endpoint.
- Considerable research into configuring H2 in memory database for testing purposes. Have possibly locked on to a configuration that will yield desired results.

Tomorrow's goals

- Try and complete means for full crud testing with in memory database.

---

-- 24 Jan 2023 --

Starting to get a bit more dialed with my procedure and what needs to come next. The pieces are falling together. I do find that I am prone to losing time because I worry about best practice and simply questioning if I'm doing this right in order to save work down the road. But sometimes you just gotta fool about and find out ^\_-.

- Created resources for searching menu items by id and category.
- Refined swagger document a bit more
- Created test file working with menu items by category
- Refined menu item path a bit so that a bit more precision is required to call an item and all items do not just become available upon endpoint entry.
- Updated DB with columns for descriptions and image urls.
- Added more DB entries to work with.

Tomorrow's goals

- More work on menu item category endpoint.
- Work on menu item test and error handling.
- Possibly work on logging.

---

-- 23 Jan 2023 --

- Created successful route test for a menu item.
- Created API documentation with swagger for menu-item end point.
- Added as project on github and linked to repository. Don't know how well I'll be able to keep up with project tracking while simultaneously developing application solo but going to give it a try.

Tomorrow's goals

- Create and Test menu-item endpoint for returning items by category.
- Add documentation for end point.
- Update DB to add columns 'description' and 'img-url' to menu-item table.
- Begin work on error handling.

---

-- 19 Jan 2023 --

- Inserted test data to local instance db.
- Created connection configuration.
- Created base entity classes.
- Created Menu Item repository as part of dao.
- Created Data Rest Config and limited access to read only.
- Tested endpoint in browser and with Postman.
- Created basic test classes.
- Updated README with a rough phase list.

Next tasks will include fleshing out the test classes. Project management with github and jira.

---

-- 18 Jan 2023 --

- Created script based on an updated EDR.
- Established local database for testing.
- Initialized SpringBoot application.
- Created base packages for further development.

---

-- 17 Jan 2023 --

Created initial EDR for consideration of database layout. This diagram will be updated as improvements are made.

&nbsp;

<p align="center">
  <img src="./back-end/supporting-files/TonsOfTacosErd.drawio2.svg"/>
</p>

&nbsp;

---

-- 16 Jan 2023 --

Created repositories, updated readme and pushed all to readme-update branch.

---

© Adam Straub 2023
