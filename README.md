# 🚀 Spizzichouse Monorepo - Next.js, NestJS, ShadCN & TailwindCSS

Welcome to the **Spizzichouse** monorepo, featuring **Next.js** for the frontend, **NestJS** for the backend, **ShadCN**, and **TailwindCSS** for UI and design.

## 📌 Technologies Used

- **Spizzichouse**: Monorepo management for optimized builds and development.
- **Next.js**: React framework for the frontend.
- **NestJS**: Node.js framework for building scalable and modular APIs.
- **ShadCN**: UI component library based on Radix UI and TailwindCSS.
- **TailwindCSS**: Utility-first CSS framework for modern and customizable interfaces.

## 📂 Project Structure

```
/spizzichouse
│── apps
│   ├── web (Next.js)
│   ├── api (NestJS)
│── packages
│   ├── ui (ShadCN & TailwindCSS)
│   ├── eslint-config (EsLint configurations)
│   ├── typescript-config (typescript global configurations)
│── turbo.json (TurboRepo configuration)
│── package.json (General dependencies)
```

## 🚀 Setup & Installation

### 1️⃣ Clone the repository

```sh
git clone https://github.com/your-username/spizzichouse.git
cd spizzichouse
```

### 2️⃣ Install dependencies

```sh
pnpm install
```

### 3️⃣ Start the services

#### Start both services

```sh
pnpm dev
```

#### Start the NestJS backend

```sh
pnpm --filter api dev
```

#### Start the Next.js frontend

```sh
pnpm --filter web dev
```

Both services will run on [**http://localhost:8080**](http://localhost:8080) (frontend) and [**http://localhost:3000**](http://localhost:3000) (backend), respectively.

## 🌟 Main Features

✅ **Optimized Monorepo** with TurboRepo ✅ **Next.js + NestJS** for a modern and scalable architecture ✅ **UI components with ShadCN & TailwindCSS** ✅ **Efficient dependency management** between frontend and backend

## 📌 Contributions

If you want to contribute, **fork** the project, create a **branch** for your changes, and submit a **pull request**. 🚀

---

**Author**: [Your Name](https://github.com/lpalmarucci)\
**License**: MIT

