# �� Need1 - Campus Gig Exchange App

**Need1** is a college-exclusive gig-exchange platform where verified students can post micro-jobs and connect with classmates to get things done safely on campus.

## 🌟 What is Need1?

Need1 lets college students:
- **Post micro-jobs** - Moving boxes, tutoring, design work, etc.
- **Find help quickly** - Connect with verified classmates
- **Meet safely** - Built-in campus Safe-Spot locations
- **Build reputation** - Earn karma points and eco-impact badges
- **Chat privately** - Auto-deleting messages for privacy

## 📱 What You'll See

This sample includes:
- **Authentication Flow** - Welcome screen, email verification, profile setup
- **Main Dashboard** - Browse jobs and matches
- **Request System** - Post and manage micro-jobs
- **Messaging** - Chat with other students
- **Profile & Settings** - Manage your account and preferences
- **Flash Market** - Special time-limited job drops

---

# 🚀 How to Run This App (For Non-Technical Users)

## Step 1: Download Required Software

### 1.1 Download Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Click the **"Download Node.js"** button (it will show the recommended version)
3. Run the downloaded installer
4. Follow the installation wizard (click "Next" through all steps)
5. **Important**: Make sure to check "Add to PATH" during installation

### 1.2 Download Git (if you don't have it)
1. Go to [git-scm.com](https://git-scm.com/)
2. Click **"Download for Windows/Mac/Linux"**
3. Run the installer and follow the setup wizard
4. Use all default settings

### 1.3 Download Expo Go App (for your phone)
- **iPhone**: Download "Expo Go" from the App Store
- **Android**: Download "Expo Go" from Google Play Store

## Step 2: Get the Code

### Option A: Download as ZIP (Easiest)
1. Click the green **"Code"** button on this GitHub page
2. Click **"Download ZIP"**
3. Extract the ZIP file to your Desktop or Documents folder

### Option B: Clone with Git (if you have Git installed)
1. Open Terminal (Mac) or Command Prompt (Windows)
2. Navigate to where you want the project:
   ```bash
   cd Desktop
   ```
3. Clone the repository:
   ```bash
   git clone [YOUR_GITHUB_REPO_URL]
   ```

## Step 3: Install Dependencies

1. **Open Terminal/Command Prompt**:
   - **Mac**: Press `Cmd + Space`, type "Terminal", press Enter
   - **Windows**: Press `Windows + R`, type "cmd", press Enter

2. **Navigate to the project folder**:
   ```bash
   cd Desktop/need1
   ```
   (Replace "Desktop/need1" with wherever you put the project)

3. **Install the required packages**:
   ```bash
   npm install
   ```
   This will take 2-5 minutes. You'll see lots of text scrolling by - this is normal!

## Step 4: Start the App

1. **Start the development server**:
   ```bash
   npx expo start
   ```

2. **You'll see a QR code appear in your terminal** - keep this window open!

## Step 5: View the App

### On Your Phone (Recommended)
1. Open the **Expo Go** app you downloaded earlier
2. **iPhone**: Tap "Scan QR Code" and scan the QR code from your terminal
3. **Android**: Tap "Scan QR Code" and scan the QR code from your terminal
4. The app will load on your phone!

### On Your Computer (Web Browser)
1. In the terminal where you ran `npx expo start`, press **`w`**
2. Your web browser will open with the app running

### On iOS Simulator (Mac only)
1. Press **`i`** in the terminal
2. The iOS Simulator will open (you need Xcode installed)

### On Android Emulator (Windows/Mac)
1. Press **`a`** in the terminal
2. The Android emulator will open (you need Android Studio installed)

---

# 🎮 How to Use the App

## Navigation
- **Bottom tabs** let you switch between different sections
- **Tap and swipe** to navigate through screens
- **Pull down** on the dashboard to refresh

## Key Features to Try
1. **Welcome Screen** - Enter a .edu email address
2. **Profile Setup** - Choose avatar, add academic info
3. **Browse Jobs** - See sample micro-jobs posted by students
4. **Post a Request** - Try creating your own job posting
5. **Messaging** - Send messages (they auto-delete after 7 days)
6. **Profile** - View karma points and badges

---

# 🛠️ Troubleshooting

## "Command not found" errors
- Make sure Node.js is installed correctly
- Try closing and reopening your terminal
- On Windows, try using Command Prompt instead of PowerShell

## "Permission denied" errors
- On Mac: Run `sudo npm install` (enter your password when prompted)
- On Windows: Run Command Prompt as Administrator

## App won't load on phone
- Make sure your phone and computer are on the same WiFi network
- Try scanning the QR code again
- Restart the Expo Go app

## "Module not found" errors
- Make sure you're in the correct folder (`need1`)
- Run `npm install` again
- Delete the `node_modules` folder and run `npm install` again

## App looks broken or has errors
- Check the terminal for error messages
- Try pressing `r` in the terminal to reload
- Close the app and scan the QR code again

---

# 📚 What's Inside This Project

## File Structure

```
need1/
├── app/                    # Main ap
```
