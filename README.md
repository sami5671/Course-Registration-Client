
## Project Features
- User-Friendly Course Selection: 

    The application allows users to easily browse and select courses from a list. Users can view course details such as price, credit hours, and descriptions before making a selection. The selected courses are displayed in a cart for quick reference.

- Credit Hour Management: 

    The application helps students manage their credit hours effectively. It calculates the total credit hours of the selected courses and displays the remaining credit hours based on a predefined maximum credit hour limit. This feature ensures that students don't exceed their credit hour limit when registering for courses.

- Price Calculation: 

    The application automatically calculates and displays the total price of the selected courses in the cart. Users can see the cost of their chosen courses in real-time, helping them make informed decisions based on their budget.
## How I have managed the state in this project
In your project, you have effectively managed the state using React's useState hook to maintain the following pieces of state:

allCourses: This state variable holds an array of all available courses. You fetch this data from an external JSON file and initialize it with an empty array. It's updated in the useEffect hook when the component mounts, ensuring that you have access to the course data.

selectedCourse: This state variable represents the courses that the user has selected. Initially, it's set to an empty array. When a user clicks the "Select" button for a course, you update this state by appending the selected course to the existing array.

totalPrice: This state variable keeps track of the total price of the selected courses. When a user selects or deselects a course, you recalculate the total price and update this state variable accordingly.

remainingCreditHour: This state variable calculates and stores the remaining credit hours available for the user to select more courses. It's updated based on the credit hours of the selected courses and the predefined maximum credit hour limit.

totalCreditHour: Similar to the total price, this state variable keeps track of the total credit hours of the selected courses. It's updated whenever a course is selected or deselected.

To summarize how you manage the state in your project:

You initialize state variables using useState.
You use the useEffect hook to fetch and update the initial allCourses state.
State updates are triggered by user interactions, such as clicking the "Select" button for a course.
When a state update occurs, it triggers a re-render of the component, reflecting the changes in the UI.
You ensure that the selected courses, total price, remaining credit hours, and total credit hours are always in sync with user actions.
By effectively using React's state management, you've created a dynamic and responsive user interface for course selection and registration. State management is a core concept in React, and your approach demonstrates a good understanding of how to use it in a real-world application.