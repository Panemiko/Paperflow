# Paperflow

## Overview

This project aims to explore and improve the development process of academic research projects, with a particular focus on writing and organization. By creating a digital platform that leverages code versioning systems, the goal is to enhance collaboration and project management for students and researchers. Inspired by practices commonly used in software development, such as version control, this platform is designed to streamline project organization, track progress, and enable efficient teamwork.

## Problem Statement

In academic settings, students face significant challenges in managing and documenting the multiple stages of a research project. From initial conception to final presentation, the academic project lifecycle is complex, requiring careful version tracking, collaboration, and accessible documentation tools. Current solutions often lack user-friendly interfaces or sufficient functionality to meet these needs, posing barriers to effective project management.

Additionally, many students are unfamiliar with existing code versioning systems, which typically rely on command-line interfaces (CLIs) that can be intimidating and challenging to use. This project addresses the following questions:

- What improvements are needed in managing and documenting academic research?
- How can existing versioning technologies be adapted to provide a positive, accessible experience for students?

## Technical Stack

The platform is being developed using the Create T3 App boilerplate for its robust full-stack capabilities. Key technologies and tools include:

- **Frontend**:
  - **Next.js** for dynamic page rendering and routing.
  - **Tailwind CSS** for efficient, responsive design.
  - **Radix UI** and **Lucide React** for accessible, modern UI components.
- **Backend**:
  - **PostgreSQL** as the primary database, managed with **Drizzle ORM**.
  - **tRPC** for type-safe, efficient API calls between frontend and backend.
- **State Management**:
  - **Zustand** for global state management.
  - **React Query** for handling asynchronous data fetching and caching.
- **Other Libraries**:
  - **Axios** for HTTP requests.
  - **Lucia Auth** for secure, user-friendly authentication.
  - **MDXEditor** for content creation in Markdown format.
  - **React Email** and **Resend** for transactional email functionality.
  - **React Hook Form** with **Zod** for form validation and input management.

## Expected Outcomes

Upon completion, the platform is expected to:

- Improve academic research workflows by enabling streamlined project organization and collaboration.
- Provide a robust solution that enhances writing, versioning, and document management in academic projects.
- Contribute to SDG 4 by making research tools accessible and fostering inclusive educational experiences.
- Enhance the reproducibility of academic research by supporting version tracking and detailed change histories.

## How to Run the Project

To run this project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Panemiko/Paperflow.git
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables in a `.env` file (refer to `.env.example` for required variables).

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Contributions

Contributions are welcome. Please open issues for bug reports, feature requests, or discussions.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact

For more information, feel free to reach out at [titoluccao@gmail.com](mailto:titoluccao@gmail.com).
