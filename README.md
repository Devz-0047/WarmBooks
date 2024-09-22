# WarmBooks: Book Search and Management App

This project is a React-based web application that allows users to search for books using the Open Library API, display a list of selected books, and manage the list with features such as pagination, book removal, and animations using Framer Motion. Book details, including the cover, title, author, and description, are fetched and stored locally in the browser.

## Features

- **Book Search**: Search for books using the Open Library API.
- **Book Display**: Display book details, including title, author, cover image, and description.
- **Local Storage**: Save selected books in local storage so they persist across sessions.
- **Pagination**: Navigate through books using a simple pagination system.
- **Animations**: Use Framer Motion to animate book elements and buttons.
- **Responsive Design**: The layout is responsive, adjusting to different screen sizes.

## Tech Stack

- **React**: Front-end library used to build the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Framer Motion**: React animation library to animate components.
- **Open Library API**: Used for fetching book data, including title, author, and cover images.
- **Local Storage**: Persist selected books across page reloads.
- **Axios**: Library for making HTTP requests to the Open Library API.
- **React Hot Toast**: Provides toast notifications for feedback.

## Setup and Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Devz-0047/WarmBooks
   ```

2. **Navigate to the project directory**:

   ```bash
   cd WarmBooks
   ```

3. **Install dependencies**:

   ```bash
   npm i
   ```

4. **Run the App**:

   ```bash
   npm run dev
   ```

5. **Open the App**
   App should be running at http://localhost:3000

## Usage

### Book Search

1. Type the name of the book you want to search for in the search bar.
2. A dropdown will appear with a list of matching books.
3. Click on a book to add it to the list of selected books.

### Manage Books

- Once added, books are displayed in a grid with the title, author, and cover.
- Click "Read Description" to view more details about the book.
- Use the pagination buttons to navigate through books if you have more than one page of books.
- Click the delete button to remove a book from the list.

### Local Storage

The list of selected books is stored in local storage, so they persist even if you refresh the page.

## Components

- **App.js**: Main component that handles rendering the book list and pagination.
- **Navbar.js**: Component for the search bar that fetches book data from the Open Library API.
- **Book.js**: Component that displays individual book details, including the title, author, and description.
- **BookProvider.js**: Provides the context for managing selected books and storing them in local storage.
- **Stars.js**: Renders a star rating system for books (can be expanded with actual functionality).

## Screenshots

![Home Page](./screenshots/Home.png)
![Search Page](./screenshots/SearchBar.png)
![Book Details](./screenshots/Full.png)
![Ratting](./screenshots/Rattings.png)
