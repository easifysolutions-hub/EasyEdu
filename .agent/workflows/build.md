---
description: Build and Run the EasyEdu System (Web and Mobile)
---

# 🚀 Build and Run Workflow

This workflow describes how to build and run both the .NET Backend and the Expo Mobile Application.

## 1. Backend (.NET Core MVC)

The backend is built using .NET 8.0/9.0.

### Build the Backend
```powershell
dotnet build q:\EasyEdu\EasyEdu.csproj
```

### Run the Backend
```powershell
dotnet run --project q:\EasyEdu\EasyEdu.csproj
```
- **URL**: `http://localhost:5004`
- **Port Settings**: Defined in `Properties/launchSettings.json`.

---

## 2. Mobile App (Expo / React Native)

The mobile app is located in `EasyEduMobile`.

### Install Dependencies (if needed)
```powershell
cd q:\EasyEdu\EasyEduMobile
npm install
```

### Start Expo Bundler
// turbo
```powershell
cmd /c "npx expo start --offline"
```
- **Metro Bundler**: `http://localhost:8081`

---

## 3. Database Initialisation

The system automatically handles database migrations and seeding on the first run.

- **Connection String**: `Server=LENOVO;Database=EasyEdu;...` (in `appsettings.json`)
- **Seeding**: Initial roles (Admin, Teacher, Student, etc.) and master data are seeded automatically in `Program.cs`.
