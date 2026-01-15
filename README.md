# The Dog API Examples

This repository contains "micro-app" examples demonstrating how to use [The Dog API](https://thedogapi.com).

Each example is a standalone HTML/JS application designed to be simple, embeddable (e.g., via iframe), and easy to understand.

## Examples

### 1. Image Upload & Breed Identification
**Directory:** `image-upload/`

A tool to upload an image and identifying the dog breed. This demonstrates:
- Uploading an image via POST (multipart/form-data).
- Handling the asynchronous status link returned by the API.
- Polling the status endpoint until analysis is complete.
- Fetching and displaying the final breed results.

To use: Open `image-upload/index.html` in your browser.

### 2. Sync Image Upload (Simpler)
**Directory:** `image-upload-sync/`

A simpler version of image upload that waits for the analysis to complete in a single request.
- Uses `POST /images/upload-sync`.
- Analysis results are returned directly in the response.
- Best for simpler integrations where holding the connection open is acceptable.

To use: Open `image-upload-sync/index.html` in your browser.

### 3. Breed Search
**Directory:** `breed-search/`

A search interface to find dog breeds by name. This demonstrates:
- Querying the `/breeds/search` endpoint.
- Handling empty results.
- Displaying breed details (Temperament, Life Span, Image).

To use: Open `breed-search/index.html` in your browser.

### 4. Voting
**Directory:** `voting/`

A fun interface to vote on random dog images. This demonstrates:
- Loading a random image via `/images/search`.
- Creating a vote via POST to `/votes`.
- Handling API keys for writing user-specific data.

To use: Open `voting/index.html` in your browser.

## Ideas for Other Micro Apps

If you want to extend this project, here are some ideas:

1.  **Favourites Manager**: Create an app to list your favourite images and allow removing them.
2.  **Grid View Gallery**: Show a grid of public images with infinite scroll.
3.  **Breed Filter**: A dropdown to filter images by specific breeds using the `/images/search?breed_ids=...` parameter.
4.  **Analysis History**: Use local storage to keep a history of images you've uploaded and their analysis results. (requires `sub_id` tracking).

## Usage

1.  Get a free API Key from [The Dog API](https://thedogapi.com).
2.  Open any `index.html` file in your web browser.
3.  Enter your API Key when prompted (some features like Voting and Upload require a valid key).
4.  Explore the code to see how simple it is to interact with the API!
