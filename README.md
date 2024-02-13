# GreenSync

App Description


# Local Development

Please ensure the below dependencies are installed on your system.
1. Docker
2. Docker-Compose

Follow the steps below to test out changes after installing above dependencies successfully

1. Clone this repository
2. Make code changes
3. Use the command `docker-compose up --build`

# Releasing Changes

Commit all changes to the `develop` branch. Changes to `main` branch should only be done through pull-requests and will trigger CI/CD pipelines.


# Branching Strategy
Development follows a feature-based branching strategy. Each Jira story has a dedicated branch where developers work independently. Upon completion and testing, their branch merges into the "develop" branch. This integrated branch then undergoes further testing in the dev environment before finally merging into the "main" branch for live deployment. This aligns with industry best practices by:

- Isolating feature development: Minimizing conflicts and promoting clear ownership.
- Encouraging collaboration: Pull requests ensure code quality and shared understanding.
- Maintaining a stable main branch: Guaranteeing a reliable production environment.
