```json
...
"builder": "@angular/build:application",
"options": {
  "browser": "projects/doc/src/main.ts",
  "tsConfig": "projects/doc/tsconfig.app.json",
  "assets": [
    {
      "glob": "**/*",
      "input": "projects/doc/public"
    }
  ],
  "styles": [
    "@koalarx/ui/theme/koala.css",
    "src/styles.css"
  ],
  "allowedCommonJsDependencies": ["@koalarx/utils"],
  "optimization": true,
  "aot": true,
  "statsJson": true
},
...
```
