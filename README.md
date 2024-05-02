# WellnessZ Assignment - REST API using Node.js + SQL

This project is a solution to the WellnessZ assignment, which involves creating a REST API using Node.js and SQL. The API allows users to manage posts, including creating new posts, retrieving all posts with options for sorting, pagination, keyword filtering, and tag filtering.

## Requirements

- Node.js
- SQL database (MySQL, PostgreSQL, etc.)
- Cloud storage service (AWS S3, Cloudinary, etc.)

## Installation

1. Clone the repository:

```bash
https://github.com/zenrsr/WellnessZ-Assignment.git
```

2. Install dependencies:

```bash
cd WellnessZ-Assignment
npm install
```

3. Set up the database:
   
   - Create a new database.
   - Update the database connection configuration in `config/db.js`.

4. Set up cloud storage service:

   - Obtain API credentials for the chosen cloud storage service.
   - Update the cloud storage configuration.

## Usage

1. Run the server:

# Go ahead and copy the package.json file

```bash
npm run server
```

2. Access the API endpoints using Postman or any other HTTP client.

## API Endpoints

### Get All Posts

- **URL**: `/posts`
- **Method**: `GET`
- **Query Parameters**:
  - `sort`: Sort the posts (e.g., `asc`, `desc`).
  - `page`: Paginate the results (e.g., `1`, `2`).
  - `keyword`: Filter posts by keyword in title or description.
  - `tag`: Filter posts by tag.

### Create a Post

- **URL**: `/uploads`
- **Method**: `POST`
- **Request Body**: 
  ```json
  {
    "title": "Arlecchino",
    "descriptionn": "The Knave",
    "tag": "Genhsin Impact",
    "image": "base64-encoded-image.png"
  }
  ```

## Deployment

To deploy the solution into production:

1. Set up a production environment with appropriate configurations.
2. Deploy the application using a platform like Heroku, AWS Elastic Beanstalk, or your preferred hosting service.

## Postman Collection

A Postman collection with examples for each API endpoint is available [here](https://www.postman.com/solar-flare-193342/workspace/wellnessz/collection/33660472-d5769932-c407-4333-b72f-4feb39a99d60?action=share&creator=33660472).

## Contributors

- [Raga Sandeep Reddy](https://github.com/zenrsr/) - Project Lead & Developer

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
