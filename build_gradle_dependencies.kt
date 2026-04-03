// ─── build.gradle (app level) ────────────────────────────────────────────────
// Add these dependencies inside the dependencies { } block

dependencies {

    // Firebase BOM — manages all Firebase library versions together
    implementation platform('com.google.firebase:firebase-bom:32.7.0')

    // Firebase Realtime Database
    implementation 'com.google.firebase:firebase-database-ktx'

    // Firebase Auth (optional — required if your DB rules need authentication)
    // implementation 'com.google.firebase:firebase-auth-ktx'

    // Material Components (for MaterialButton style)
    implementation 'com.google.android.material:material:1.11.0'

    // ViewBinding (already enabled if you use ActivityMainBinding)
    // Enable in build.gradle android { } block:
    //   buildFeatures { viewBinding true }
}

// ─── build.gradle (project level) ────────────────────────────────────────────
// Add the Google services plugin in the plugins { } block:
//
//   id 'com.google.gms.google-services' version '4.4.1' apply false
//
// And in the app-level build.gradle plugins { } block:
//
//   id 'com.google.gms.google-services'

// ─── AndroidManifest.xml ─────────────────────────────────────────────────────
// Add internet permission inside <manifest> before <application>:
//
//   <uses-permission android:name="android.permission.INTERNET" />

// ─── google-services.json ────────────────────────────────────────────────────
// Download from Firebase Console → Project Settings → Your Apps
// Place it in:  app/google-services.json
