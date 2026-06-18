export default [
  {
    id: 'TC-WEB-SPLASH-001',
    module: 'Shared & Onboarding',
    screen: 'SplashScreen',
    scenario: 'Verify splash screen loads successfully',
    expected: 'Splash screen should be visible',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SPLASH-002',
    module: 'Shared & Onboarding',
    screen: 'SplashScreen',
    scenario: 'Verify app logo is displayed',
    expected: 'Logo should be rendered correctly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SPLASH-003',
    module: 'Shared & Onboarding',
    screen: 'SplashScreen',
    scenario: 'Verify background color matches theme',
    expected: 'Background color should be accurate',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SPLASH-004',
    module: 'Shared & Onboarding',
    screen: 'SplashScreen',
    scenario: 'Verify splash screen timeout transitions to welcome screen',
    expected: 'Should navigate to welcome after delay',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SPLASH-005',
    module: 'Shared & Onboarding',
    screen: 'SplashScreen',
    scenario: 'Verify animation executes smoothly',
    expected: 'Animation finishes without stutter',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SPLASH-006',
    module: 'Shared & Onboarding',
    screen: 'SplashScreen',
    scenario: 'Verify back button is disabled during splash',
    expected: 'Cannot navigate back from splash',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SPLASH-007',
    module: 'Shared & Onboarding',
    screen: 'SplashScreen',
    scenario: 'Verify text content is localized',
    expected: 'Text should match user locale',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SPLASH-008',
    module: 'Shared & Onboarding',
    screen: 'SplashScreen',
    scenario: 'Verify network error handling during initialization',
    expected: 'Should show retry if initialization fails',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SPLASH-009',
    module: 'Shared & Onboarding',
    screen: 'SplashScreen',
    scenario: 'Verify auto-login if token exists',
    expected: 'Should transition to dashboard if authenticated',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SPLASH-010',
    module: 'Shared & Onboarding',
    screen: 'SplashScreen',
    scenario: 'Verify performance load time is under 2 seconds',
    expected: 'Splash should vanish under 2s',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WELCOME-001',
    module: 'Shared & Onboarding',
    screen: 'WelcomeScreen',
    scenario: 'Verify welcome screen loads',
    expected: 'Welcome screen should be visible',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WELCOME-002',
    module: 'Shared & Onboarding',
    screen: 'WelcomeScreen',
    scenario: 'Verify "Get Started" button exists',
    expected: 'Button should be present and clickable',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WELCOME-003',
    module: 'Shared & Onboarding',
    screen: 'WelcomeScreen',
    scenario: 'Verify "Login" link navigates to login page',
    expected: 'Should navigate to login page on click',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WELCOME-004',
    module: 'Shared & Onboarding',
    screen: 'WelcomeScreen',
    scenario: 'Verify onboarding carousel works',
    expected: 'Carousel should swipe correctly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WELCOME-005',
    module: 'Shared & Onboarding',
    screen: 'WelcomeScreen',
    scenario: 'Verify skipping onboarding',
    expected: 'Skip button should skip to end',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WELCOME-006',
    module: 'Shared & Onboarding',
    screen: 'WelcomeScreen',
    scenario: 'Verify illustrations load',
    expected: 'Images should not be broken',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WELCOME-007',
    module: 'Shared & Onboarding',
    screen: 'WelcomeScreen',
    scenario: 'Verify responsive layout on welcome',
    expected: 'Should adapt to screen size',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WELCOME-008',
    module: 'Shared & Onboarding',
    screen: 'WelcomeScreen',
    scenario: 'Verify accessibility labels on buttons',
    expected: 'Screen readers should read labels',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WELCOME-009',
    module: 'Shared & Onboarding',
    screen: 'WelcomeScreen',
    scenario: 'Verify terms and conditions link',
    expected: 'Should open terms modal or page',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WELCOME-010',
    module: 'Shared & Onboarding',
    screen: 'WelcomeScreen',
    scenario: 'Verify privacy policy link',
    expected: 'Should open privacy page',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-404-001',
    module: 'Shared & Onboarding',
    screen: 'NotFoundPage',
    scenario: 'Verify 404 page renders for invalid URLs',
    expected: '404 screen should be shown',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-404-002',
    module: 'Shared & Onboarding',
    screen: 'NotFoundPage',
    scenario: 'Verify "Go Home" button works',
    expected: 'Should navigate to dashboard/home',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-404-003',
    module: 'Shared & Onboarding',
    screen: 'NotFoundPage',
    scenario: 'Verify error message is clear',
    expected: 'Should display user-friendly error text',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-404-004',
    module: 'Shared & Onboarding',
    screen: 'NotFoundPage',
    scenario: 'Verify 404 image is rendered',
    expected: 'Image should be visible',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-404-005',
    module: 'Shared & Onboarding',
    screen: 'NotFoundPage',
    scenario: 'Verify layout on mobile screens',
    expected: 'Should be centered on mobile',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-404-006',
    module: 'Shared & Onboarding',
    screen: 'NotFoundPage',
    scenario: 'Verify language translation for 404',
    expected: 'Text should change according to locale',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-404-007',
    module: 'Shared & Onboarding',
    screen: 'NotFoundPage',
    scenario: 'Verify back button functionality',
    expected: 'Should return to previous valid page',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-404-008',
    module: 'Shared & Onboarding',
    screen: 'NotFoundPage',
    scenario: 'Verify header/footer are still accessible',
    expected: 'Navigation wrapper should remain',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-404-009',
    module: 'Shared & Onboarding',
    screen: 'NotFoundPage',
    scenario: 'Verify dark mode support on 404',
    expected: 'Colors should adapt to dark mode',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-404-010',
    module: 'Shared & Onboarding',
    screen: 'NotFoundPage',
    scenario: 'Verify analytics event is fired for 404',
    expected: 'Should log error to analytics',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-LOGIN-001',
    module: 'Authentication',
    screen: 'LoginPage',
    scenario: 'Verify successful login with valid credentials',
    expected: 'User should be redirected to Dashboard',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-LOGIN-002',
    module: 'Authentication',
    screen: 'LoginPage',
    scenario: 'Verify invalid password displays error',
    expected: 'Error message should be shown',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-LOGIN-003',
    module: 'Authentication',
    screen: 'LoginPage',
    scenario: 'Verify empty email validation',
    expected: 'Validation message "Email is required" should appear',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-LOGIN-004',
    module: 'Authentication',
    screen: 'LoginPage',
    scenario: 'Verify empty password validation',
    expected: 'Validation message "Password is required" should appear',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-LOGIN-005',
    module: 'Authentication',
    screen: 'LoginPage',
    scenario: 'Verify invalid email format validation',
    expected: 'Should enforce valid email format',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-LOGIN-006',
    module: 'Authentication',
    screen: 'LoginPage',
    scenario: 'Verify "Forgot Password" link works',
    expected: 'Should navigate to forgot password page',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-LOGIN-007',
    module: 'Authentication',
    screen: 'LoginPage',
    scenario: 'Verify "Sign Up" link navigates to signup',
    expected: 'Should navigate to signup page',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-LOGIN-008',
    module: 'Authentication',
    screen: 'LoginPage',
    scenario: 'Verify password visibility toggle',
    expected: 'Password should toggle between text and dots',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-LOGIN-009',
    module: 'Authentication',
    screen: 'LoginPage',
    scenario: 'Verify remember me checkbox',
    expected: 'Should persist session if checked',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-LOGIN-010',
    module: 'Authentication',
    screen: 'LoginPage',
    scenario: 'Verify login button is disabled while submitting',
    expected: 'Button should show loading state',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SIGNUP-001',
    module: 'Authentication',
    screen: 'SignupPage',
    scenario: 'Verify successful registration',
    expected: 'Account should be created and user logged in',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SIGNUP-002',
    module: 'Authentication',
    screen: 'SignupPage',
    scenario: 'Verify existing email error',
    expected: 'Should show "Email already in use" error',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SIGNUP-003',
    module: 'Authentication',
    screen: 'SignupPage',
    scenario: 'Verify password strength validation',
    expected: 'Should enforce strong password criteria',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SIGNUP-004',
    module: 'Authentication',
    screen: 'SignupPage',
    scenario: 'Verify passwords match validation',
    expected: 'Confirm password should match password',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SIGNUP-005',
    module: 'Authentication',
    screen: 'SignupPage',
    scenario: 'Verify empty fields validation',
    expected: 'Should highlight all required fields',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SIGNUP-006',
    module: 'Authentication',
    screen: 'SignupPage',
    scenario: 'Verify terms acceptance checkbox',
    expected: 'Must check terms to proceed',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SIGNUP-007',
    module: 'Authentication',
    screen: 'SignupPage',
    scenario: 'Verify social sign-up options exist',
    expected: 'Google/Apple sign-up buttons should be visible',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SIGNUP-008',
    module: 'Authentication',
    screen: 'SignupPage',
    scenario: 'Verify navigating back to login',
    expected: 'Login link should work',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SIGNUP-009',
    module: 'Authentication',
    screen: 'SignupPage',
    scenario: 'Verify input limits on name field',
    expected: 'Name should have a max length',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SIGNUP-010',
    module: 'Authentication',
    screen: 'SignupPage',
    scenario: 'Verify submission loading state',
    expected: 'Button should show spinner',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FORGOTPWD-001',
    module: 'Authentication',
    screen: 'ForgotPasswordPage',
    scenario: 'Verify valid email sends reset link',
    expected: 'Success message should appear',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FORGOTPWD-002',
    module: 'Authentication',
    screen: 'ForgotPasswordPage',
    scenario: 'Verify unregistered email error',
    expected: 'Should handle unknown email safely',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FORGOTPWD-003',
    module: 'Authentication',
    screen: 'ForgotPasswordPage',
    scenario: 'Verify empty email validation',
    expected: 'Should require email input',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FORGOTPWD-004',
    module: 'Authentication',
    screen: 'ForgotPasswordPage',
    scenario: 'Verify invalid email format',
    expected: 'Should enforce email format',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FORGOTPWD-005',
    module: 'Authentication',
    screen: 'ForgotPasswordPage',
    scenario: 'Verify back to login link',
    expected: 'Should return to login page',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FORGOTPWD-006',
    module: 'Authentication',
    screen: 'ForgotPasswordPage',
    scenario: 'Verify resend link cooldown',
    expected: 'Should prevent spamming resend',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FORGOTPWD-007',
    module: 'Authentication',
    screen: 'ForgotPasswordPage',
    scenario: 'Verify loading state on submit',
    expected: 'Button should show spinner',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FORGOTPWD-008',
    module: 'Authentication',
    screen: 'ForgotPasswordPage',
    scenario: 'Verify keyboard enter submits form',
    expected: 'Enter key should trigger submission',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FORGOTPWD-009',
    module: 'Authentication',
    screen: 'ForgotPasswordPage',
    scenario: 'Verify dark mode styling',
    expected: 'Input should be legible in dark mode',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FORGOTPWD-010',
    module: 'Authentication',
    screen: 'ForgotPasswordPage',
    scenario: 'Verify screen reader accessibility',
    expected: 'Input should have correct aria-labels',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RESETPWD-001',
    module: 'Authentication',
    screen: 'ResetPasswordPage',
    scenario: 'Verify successful password reset',
    expected: 'Should show success and redirect to login',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RESETPWD-002',
    module: 'Authentication',
    screen: 'ResetPasswordPage',
    scenario: 'Verify invalid or expired token error',
    expected: 'Should show token expiration message',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RESETPWD-003',
    module: 'Authentication',
    screen: 'ResetPasswordPage',
    scenario: 'Verify new password strength validation',
    expected: 'Should require secure password',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RESETPWD-004',
    module: 'Authentication',
    screen: 'ResetPasswordPage',
    scenario: 'Verify confirm new password matches',
    expected: 'Should reject non-matching passwords',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RESETPWD-005',
    module: 'Authentication',
    screen: 'ResetPasswordPage',
    scenario: 'Verify password visibility toggle',
    expected: 'Should toggle text visibility',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RESETPWD-006',
    module: 'Authentication',
    screen: 'ResetPasswordPage',
    scenario: 'Verify empty fields validation',
    expected: 'Should prevent empty submissions',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RESETPWD-007',
    module: 'Authentication',
    screen: 'ResetPasswordPage',
    scenario: 'Verify back to login navigation',
    expected: 'Should allow user to cancel',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RESETPWD-008',
    module: 'Authentication',
    screen: 'ResetPasswordPage',
    scenario: 'Verify submission loading state',
    expected: 'Button should be disabled during request',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RESETPWD-009',
    module: 'Authentication',
    screen: 'ResetPasswordPage',
    scenario: 'Verify session is cleared after reset',
    expected: 'User should need to login again',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RESETPWD-010',
    module: 'Authentication',
    screen: 'ResetPasswordPage',
    scenario: 'Verify UI layout responsiveness',
    expected: 'Should look good on mobile devices',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-DASH-001',
    module: 'Dashboard',
    screen: 'DashboardPage',
    scenario: 'Verify total balance is displayed accurately',
    expected: 'Balance should reflect sum of accounts',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-DASH-002',
    module: 'Dashboard',
    screen: 'DashboardPage',
    scenario: 'Verify recent transactions widget loads data',
    expected: 'Should display list of recent txns',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-DASH-003',
    module: 'Dashboard',
    screen: 'DashboardPage',
    scenario: 'Verify "Add Transaction" quick action works',
    expected: 'Should navigate to add transaction',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-DASH-004',
    module: 'Dashboard',
    screen: 'DashboardPage',
    scenario: 'Verify expenses breakdown chart renders',
    expected: 'Pie chart should be visible',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-DASH-005',
    module: 'Dashboard',
    screen: 'DashboardPage',
    scenario: 'Verify pull-to-refresh / manual refresh updates data',
    expected: 'Data should sync with server',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-DASH-006',
    module: 'Dashboard',
    screen: 'DashboardPage',
    scenario: 'Verify greeting changes based on time of day',
    expected: 'Should say Good Morning/Evening',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-DASH-007',
    module: 'Dashboard',
    screen: 'DashboardPage',
    scenario: 'Verify AI suggestion widget is visible',
    expected: 'Should display AI tip',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-DASH-008',
    module: 'Dashboard',
    screen: 'DashboardPage',
    scenario: 'Verify notification bell indicates unread count',
    expected: 'Badge should show count',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-DASH-009',
    module: 'Dashboard',
    screen: 'DashboardPage',
    scenario: 'Verify navigating to full transaction list',
    expected: 'View All should navigate to list',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-DASH-010',
    module: 'Dashboard',
    screen: 'DashboardPage',
    scenario: 'Verify skeleton loaders appear while fetching',
    expected: 'Should show loading state initially',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXLIST-001',
    module: 'Finance',
    screen: 'TransactionListPage',
    scenario: 'Verify all transactions are listed chronologically',
    expected: 'Should be sorted by date desc',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXLIST-002',
    module: 'Finance',
    screen: 'TransactionListPage',
    scenario: 'Verify search by transaction name',
    expected: 'Should filter list by search query',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXLIST-003',
    module: 'Finance',
    screen: 'TransactionListPage',
    scenario: 'Verify filter by category',
    expected: 'Should only show selected category txns',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXLIST-004',
    module: 'Finance',
    screen: 'TransactionListPage',
    scenario: 'Verify filter by date range',
    expected: 'Should restrict to selected dates',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXLIST-005',
    module: 'Finance',
    screen: 'TransactionListPage',
    scenario: 'Verify pagination or infinite scroll',
    expected: 'Should load more items on scroll',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXLIST-006',
    module: 'Finance',
    screen: 'TransactionListPage',
    scenario: 'Verify clicking a transaction opens details',
    expected: 'Should navigate to details page',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXLIST-007',
    module: 'Finance',
    screen: 'TransactionListPage',
    scenario: 'Verify swipe or menu to delete transaction',
    expected: 'Should prompt for deletion',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXLIST-008',
    module: 'Finance',
    screen: 'TransactionListPage',
    scenario: 'Verify empty state when no transactions exist',
    expected: 'Should show empty placeholder',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXLIST-009',
    module: 'Finance',
    screen: 'TransactionListPage',
    scenario: 'Verify income vs expense indicators',
    expected: 'Should have green/red color coding',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXLIST-010',
    module: 'Finance',
    screen: 'TransactionListPage',
    scenario: 'Verify total amount matches filtered list',
    expected: 'Header total should update dynamically',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDTRX-001',
    module: 'Finance',
    screen: 'AddTransactionPage',
    scenario: 'Verify successful addition of an expense',
    expected: 'Should save and return to list',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDTRX-002',
    module: 'Finance',
    screen: 'AddTransactionPage',
    scenario: 'Verify successful addition of income',
    expected: 'Should save as positive amount',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDTRX-003',
    module: 'Finance',
    screen: 'AddTransactionPage',
    scenario: 'Verify required amount validation',
    expected: 'Should show error if amount is 0/empty',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDTRX-004',
    module: 'Finance',
    screen: 'AddTransactionPage',
    scenario: 'Verify category selection dropdown',
    expected: 'Should list all available categories',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDTRX-005',
    module: 'Finance',
    screen: 'AddTransactionPage',
    scenario: 'Verify date picker selection',
    expected: 'Should allow choosing a past date',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDTRX-006',
    module: 'Finance',
    screen: 'AddTransactionPage',
    scenario: 'Verify notes field accepts long text',
    expected: 'Should save description properly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDTRX-007',
    module: 'Finance',
    screen: 'AddTransactionPage',
    scenario: 'Verify receipt image upload',
    expected: 'Should allow attaching an image',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDTRX-008',
    module: 'Finance',
    screen: 'AddTransactionPage',
    scenario: 'Verify cancel button works',
    expected: 'Should navigate back without saving',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDTRX-009',
    module: 'Finance',
    screen: 'AddTransactionPage',
    scenario: 'Verify invalid amount format (letters)',
    expected: 'Should prevent non-numeric input',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDTRX-010',
    module: 'Finance',
    screen: 'AddTransactionPage',
    scenario: 'Verify adding custom category inline',
    expected: 'Should allow creating new category',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXDTL-001',
    module: 'Finance',
    screen: 'TransactionDetailPage',
    scenario: 'Verify transaction details are displayed correctly',
    expected: 'Should show amount, date, category',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXDTL-002',
    module: 'Finance',
    screen: 'TransactionDetailPage',
    scenario: 'Verify receipt image can be viewed full screen',
    expected: 'Clicking image should expand it',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXDTL-003',
    module: 'Finance',
    screen: 'TransactionDetailPage',
    scenario: 'Verify edit button navigates to edit screen',
    expected: 'Should open edit mode',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXDTL-004',
    module: 'Finance',
    screen: 'TransactionDetailPage',
    scenario: 'Verify delete button prompts confirmation',
    expected: 'Should show confirmation dialog',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXDTL-005',
    module: 'Finance',
    screen: 'TransactionDetailPage',
    scenario: 'Verify deleting from details page',
    expected: 'Should delete and return to list',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXDTL-006',
    module: 'Finance',
    screen: 'TransactionDetailPage',
    scenario: 'Verify back button returns to previous list',
    expected: 'Should navigate back correctly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXDTL-007',
    module: 'Finance',
    screen: 'TransactionDetailPage',
    scenario: 'Verify shared transaction indicator',
    expected: 'Should show if split with someone',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXDTL-008',
    module: 'Finance',
    screen: 'TransactionDetailPage',
    scenario: 'Verify category icon is correct',
    expected: 'Should display mapped icon for category',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXDTL-009',
    module: 'Finance',
    screen: 'TransactionDetailPage',
    scenario: 'Verify notes are fully displayed',
    expected: 'Long notes should not be truncated',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-TRXDTL-010',
    module: 'Finance',
    screen: 'TransactionDetailPage',
    scenario: 'Verify dark mode text colors',
    expected: 'Details should be readable in dark theme',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITTRX-001',
    module: 'Finance',
    screen: 'EditTransactionPage',
    scenario: 'Verify successful edit of amount',
    expected: 'Should save new amount and reflect in list',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITTRX-002',
    module: 'Finance',
    screen: 'EditTransactionPage',
    scenario: 'Verify changing category updates icon',
    expected: 'Should save new category',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITTRX-003',
    module: 'Finance',
    screen: 'EditTransactionPage',
    scenario: 'Verify removing receipt image',
    expected: 'Should successfully detach image',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITTRX-004',
    module: 'Finance',
    screen: 'EditTransactionPage',
    scenario: 'Verify discard changes prompt on back',
    expected: 'Should warn if unsaved changes exist',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITTRX-005',
    module: 'Finance',
    screen: 'EditTransactionPage',
    scenario: 'Verify save button disabled if no changes',
    expected: 'Button should only enable on edit',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITTRX-006',
    module: 'Finance',
    screen: 'EditTransactionPage',
    scenario: 'Verify empty amount validation on edit',
    expected: 'Should prevent saving 0/empty amount',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITTRX-007',
    module: 'Finance',
    screen: 'EditTransactionPage',
    scenario: 'Verify date change updates chronological order',
    expected: 'Should save new date correctly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITTRX-008',
    module: 'Finance',
    screen: 'EditTransactionPage',
    scenario: 'Verify loading state during save',
    expected: 'Should show spinner on save button',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITTRX-009',
    module: 'Finance',
    screen: 'EditTransactionPage',
    scenario: 'Verify error handling if API fails on save',
    expected: 'Should show toast error message',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITTRX-010',
    module: 'Finance',
    screen: 'EditTransactionPage',
    scenario: 'Verify cancel returns to details page',
    expected: 'Should abandon edits',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CATBRK-001',
    module: 'Finance',
    screen: 'CategoryBreakdownPage',
    scenario: 'Verify pie chart displays all categories',
    expected: 'Chart should render slices properly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CATBRK-002',
    module: 'Finance',
    screen: 'CategoryBreakdownPage',
    scenario: 'Verify total spent matches sum of categories',
    expected: 'Total should be mathematically correct',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CATBRK-003',
    module: 'Finance',
    screen: 'CategoryBreakdownPage',
    scenario: 'Verify clicking slice shows category details',
    expected: 'Should filter transactions by category',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CATBRK-004',
    module: 'Finance',
    screen: 'CategoryBreakdownPage',
    scenario: 'Verify changing month updates breakdown',
    expected: 'Data should reflect selected month',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CATBRK-005',
    module: 'Finance',
    screen: 'CategoryBreakdownPage',
    scenario: 'Verify empty state for month with no expenses',
    expected: 'Should show "No data" placeholder',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CATBRK-006',
    module: 'Finance',
    screen: 'CategoryBreakdownPage',
    scenario: 'Verify legend matches chart colors',
    expected: 'Colors should map correctly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CATBRK-007',
    module: 'Finance',
    screen: 'CategoryBreakdownPage',
    scenario: 'Verify percentage calculation accuracy',
    expected: 'Percentages should sum to ~100%',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CATBRK-008',
    module: 'Finance',
    screen: 'CategoryBreakdownPage',
    scenario: 'Verify excluding specific category from view',
    expected: 'Should toggle category visibility',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CATBRK-009',
    module: 'Finance',
    screen: 'CategoryBreakdownPage',
    scenario: 'Verify exporting breakdown data',
    expected: 'Should download CSV/PDF report',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CATBRK-010',
    module: 'Finance',
    screen: 'CategoryBreakdownPage',
    scenario: 'Verify animation when chart loads',
    expected: 'Chart should animate in smoothly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-MTHREP-001',
    module: 'Finance',
    screen: 'MonthlyReportPage',
    scenario: 'Verify monthly summary metrics load',
    expected: 'Income/Expense/Savings should be visible',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-MTHREP-002',
    module: 'Finance',
    screen: 'MonthlyReportPage',
    scenario: 'Verify month selector dropdown',
    expected: 'Should allow selecting previous months',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-MTHREP-003',
    module: 'Finance',
    screen: 'MonthlyReportPage',
    scenario: 'Verify bar chart for daily spending',
    expected: 'Chart should render correctly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-MTHREP-004',
    module: 'Finance',
    screen: 'MonthlyReportPage',
    scenario: 'Verify top 3 expenses section',
    expected: 'Should list highest transactions',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-MTHREP-005',
    module: 'Finance',
    screen: 'MonthlyReportPage',
    scenario: 'Verify comparison with previous month',
    expected: 'Should show % up or down',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-MTHREP-006',
    module: 'Finance',
    screen: 'MonthlyReportPage',
    scenario: 'Verify empty month handles gracefully',
    expected: 'Should show zero states',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-MTHREP-007',
    module: 'Finance',
    screen: 'MonthlyReportPage',
    scenario: 'Verify sharing the report',
    expected: 'Share button should invoke native share/copy link',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-MTHREP-008',
    module: 'Finance',
    screen: 'MonthlyReportPage',
    scenario: 'Verify budget vs actual progress bar',
    expected: 'Should show how much budget is used',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-MTHREP-009',
    module: 'Finance',
    screen: 'MonthlyReportPage',
    scenario: 'Verify AI insights for the month',
    expected: 'Should show generated summary',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-MTHREP-010',
    module: 'Finance',
    screen: 'MonthlyReportPage',
    scenario: 'Verify PDF download of monthly report',
    expected: 'Should generate and download PDF',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RECEXP-001',
    module: 'Finance',
    screen: 'RecurringExpensesPage',
    scenario: 'Verify list of active subscriptions',
    expected: 'Should display all recurring items',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RECEXP-002',
    module: 'Finance',
    screen: 'RecurringExpensesPage',
    scenario: 'Verify total monthly recurring cost',
    expected: 'Should calculate total accurately',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RECEXP-003',
    module: 'Finance',
    screen: 'RecurringExpensesPage',
    scenario: 'Verify upcoming payments highlighted',
    expected: 'Items due soon should be marked',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RECEXP-004',
    module: 'Finance',
    screen: 'RecurringExpensesPage',
    scenario: 'Verify marking an expense as paid',
    expected: 'Should record transaction and update next due',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RECEXP-005',
    module: 'Finance',
    screen: 'RecurringExpensesPage',
    scenario: 'Verify pausing a subscription',
    expected: 'Should move to inactive list',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RECEXP-006',
    module: 'Finance',
    screen: 'RecurringExpensesPage',
    scenario: 'Verify deleting a recurring expense',
    expected: 'Should remove from list',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RECEXP-007',
    module: 'Finance',
    screen: 'RecurringExpensesPage',
    scenario: 'Verify empty state for no subscriptions',
    expected: 'Should show "Add your first..." message',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RECEXP-008',
    module: 'Finance',
    screen: 'RecurringExpensesPage',
    scenario: 'Verify sorting by due date',
    expected: 'Should order items correctly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RECEXP-009',
    module: 'Finance',
    screen: 'RecurringExpensesPage',
    scenario: 'Verify auto-pay indicator',
    expected: 'Should show which are automated',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-RECEXP-010',
    module: 'Finance',
    screen: 'RecurringExpensesPage',
    scenario: 'Verify navigation to add new recurring',
    expected: 'Should open add page',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDREC-001',
    module: 'Finance',
    screen: 'AddRecurringExpensePage',
    scenario: 'Verify successful creation of monthly expense',
    expected: 'Should save and appear in list',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDREC-002',
    module: 'Finance',
    screen: 'AddRecurringExpensePage',
    scenario: 'Verify frequency selection (Weekly/Monthly/Yearly)',
    expected: 'Should handle all frequencies',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDREC-003',
    module: 'Finance',
    screen: 'AddRecurringExpensePage',
    scenario: 'Verify next due date calculation',
    expected: 'Should preview correct next date',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDREC-004',
    module: 'Finance',
    screen: 'AddRecurringExpensePage',
    scenario: 'Verify validation for empty name/amount',
    expected: 'Should require mandatory fields',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDREC-005',
    module: 'Finance',
    screen: 'AddRecurringExpensePage',
    scenario: 'Verify setting reminder toggle',
    expected: 'Should allow setting days before reminder',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDREC-006',
    module: 'Finance',
    screen: 'AddRecurringExpensePage',
    scenario: 'Verify category assignment',
    expected: 'Should link to budget category',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDREC-007',
    module: 'Finance',
    screen: 'AddRecurringExpensePage',
    scenario: 'Verify selecting auto-pay status',
    expected: 'Should save auto-pay flag',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDREC-008',
    module: 'Finance',
    screen: 'AddRecurringExpensePage',
    scenario: 'Verify cancel button behavior',
    expected: 'Should return without saving',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDREC-009',
    module: 'Finance',
    screen: 'AddRecurringExpensePage',
    scenario: 'Verify duplicate subscription warning',
    expected: 'Should warn if similar name exists',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDREC-010',
    module: 'Finance',
    screen: 'AddRecurringExpensePage',
    scenario: 'Verify saving state disables button',
    expected: 'Should show loading spinner',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-INSOVR-001',
    module: 'Insights',
    screen: 'InsightsOverviewPage',
    scenario: 'Verify overall financial score is displayed',
    expected: 'Should show health score',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-INSOVR-002',
    module: 'Insights',
    screen: 'InsightsOverviewPage',
    scenario: 'Verify top spending alert',
    expected: 'Should highlight unusual spending',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-INSOVR-003',
    module: 'Insights',
    screen: 'InsightsOverviewPage',
    scenario: 'Verify savings opportunity suggestion',
    expected: 'Should display AI recommendation',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-INSOVR-004',
    module: 'Insights',
    screen: 'InsightsOverviewPage',
    scenario: 'Verify navigation to weekly report',
    expected: 'Should open weekly details',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-INSOVR-005',
    module: 'Insights',
    screen: 'InsightsOverviewPage',
    scenario: 'Verify navigation to cash flow',
    expected: 'Should open cash flow details',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-INSOVR-006',
    module: 'Insights',
    screen: 'InsightsOverviewPage',
    scenario: 'Verify pull to refresh insights',
    expected: 'Should regenerate/fetch new data',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-INSOVR-007',
    module: 'Insights',
    screen: 'InsightsOverviewPage',
    scenario: 'Verify empty state for new users',
    expected: 'Should prompt to add more data',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-INSOVR-008',
    module: 'Insights',
    screen: 'InsightsOverviewPage',
    scenario: 'Verify dismissing an insight card',
    expected: 'Card should be removed from view',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-INSOVR-009',
    module: 'Insights',
    screen: 'InsightsOverviewPage',
    scenario: 'Verify tooltips for complex metrics',
    expected: 'Should explain what the metric means',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-INSOVR-010',
    module: 'Insights',
    screen: 'InsightsOverviewPage',
    scenario: 'Verify layout breaks on small screens',
    expected: 'Cards should stack vertically',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WKREP-001',
    module: 'Insights',
    screen: 'WeeklyReportPage',
    scenario: 'Verify week-over-week spending comparison',
    expected: 'Should show % change',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WKREP-002',
    module: 'Insights',
    screen: 'WeeklyReportPage',
    scenario: 'Verify day-by-day bar chart',
    expected: 'Should display 7 bars for the week',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WKREP-003',
    module: 'Insights',
    screen: 'WeeklyReportPage',
    scenario: 'Verify highest spending day identified',
    expected: 'Should highlight peak day',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WKREP-004',
    module: 'Insights',
    screen: 'WeeklyReportPage',
    scenario: 'Verify navigating to previous week',
    expected: 'Should load past week data',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WKREP-005',
    module: 'Insights',
    screen: 'WeeklyReportPage',
    scenario: 'Verify weekend vs weekday breakdown',
    expected: 'Should display proportion',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WKREP-006',
    module: 'Insights',
    screen: 'WeeklyReportPage',
    scenario: 'Verify empty state for no data week',
    expected: 'Should show zero metrics',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WKREP-007',
    module: 'Insights',
    screen: 'WeeklyReportPage',
    scenario: 'Verify category with highest increase',
    expected: 'Should flag anomaly category',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WKREP-008',
    module: 'Insights',
    screen: 'WeeklyReportPage',
    scenario: 'Verify closing the report returns to insights',
    expected: 'Should navigate back',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WKREP-009',
    module: 'Insights',
    screen: 'WeeklyReportPage',
    scenario: 'Verify sharing weekly summary',
    expected: 'Should format shareable text',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-WKREP-010',
    module: 'Insights',
    screen: 'WeeklyReportPage',
    scenario: 'Verify chart tooltips on hover/tap',
    expected: 'Should show exact daily amount',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CASHFLW-001',
    module: 'Insights',
    screen: 'CashFlowPage',
    scenario: 'Verify Income vs Expense line chart',
    expected: 'Should plot two distinct lines',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CASHFLW-002',
    module: 'Insights',
    screen: 'CashFlowPage',
    scenario: 'Verify net cash flow calculation',
    expected: 'Should show Income minus Expenses',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CASHFLW-003',
    module: 'Insights',
    screen: 'CashFlowPage',
    scenario: 'Verify changing timeframe (3M/6M/1Y)',
    expected: 'Chart should adjust data points',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CASHFLW-004',
    module: 'Insights',
    screen: 'CashFlowPage',
    scenario: 'Verify negative cash flow highlighting',
    expected: 'Should show warning if expenses > income',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CASHFLW-005',
    module: 'Insights',
    screen: 'CashFlowPage',
    scenario: 'Verify hovering on chart nodes',
    expected: 'Should show precise monthly data',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CASHFLW-006',
    module: 'Insights',
    screen: 'CashFlowPage',
    scenario: 'Verify list of top income sources',
    expected: 'Should display highest earners',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CASHFLW-007',
    module: 'Insights',
    screen: 'CashFlowPage',
    scenario: 'Verify list of top expense categories',
    expected: 'Should display highest drainers',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CASHFLW-008',
    module: 'Insights',
    screen: 'CashFlowPage',
    scenario: 'Verify loading skeleton for heavy data',
    expected: 'Should show loader during calculation',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CASHFLW-009',
    module: 'Insights',
    screen: 'CashFlowPage',
    scenario: 'Verify projection for current month',
    expected: 'Should show dotted line for expected end',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-CASHFLW-010',
    module: 'Insights',
    screen: 'CashFlowPage',
    scenario: 'Verify exporting cash flow data',
    expected: 'Should download CSV format',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PRED-001',
    module: 'Insights',
    screen: 'PredictionsPage',
    scenario: 'Verify AI end-of-month balance prediction',
    expected: 'Should show estimated balance',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PRED-002',
    module: 'Insights',
    screen: 'PredictionsPage',
    scenario: 'Verify upcoming bills are factored in',
    expected: 'Should list deducted upcoming bills',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PRED-003',
    module: 'Insights',
    screen: 'PredictionsPage',
    scenario: 'Verify warning for potential overdraft',
    expected: 'Should alert if prediction is < 0',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PRED-004',
    module: 'Insights',
    screen: 'PredictionsPage',
    scenario: 'Verify adjusting prediction parameters',
    expected: 'Should allow "what if" scenarios',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PRED-005',
    module: 'Insights',
    screen: 'PredictionsPage',
    scenario: 'Verify accuracy indicator',
    expected: 'Should show confidence level of prediction',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PRED-006',
    module: 'Insights',
    screen: 'PredictionsPage',
    scenario: 'Verify historical prediction accuracy',
    expected: 'Should show past performance of AI',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PRED-007',
    module: 'Insights',
    screen: 'PredictionsPage',
    scenario: 'Verify empty state if not enough data',
    expected: 'Should say requires 1+ month of data',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PRED-008',
    module: 'Insights',
    screen: 'PredictionsPage',
    scenario: 'Verify graphic visualization of trajectory',
    expected: 'Should show funnel/cone chart',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PRED-009',
    module: 'Insights',
    screen: 'PredictionsPage',
    scenario: 'Verify actionable advice to improve prediction',
    expected: 'Should suggest lowering X expense',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PRED-010',
    module: 'Insights',
    screen: 'PredictionsPage',
    scenario: 'Verify dark mode contrast for charts',
    expected: 'Should be legible in dark theme',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FINHLTH-001',
    module: 'Insights',
    screen: 'FinancialHealthPage',
    scenario: 'Verify overall health score dial',
    expected: 'Should render score from 0-100',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FINHLTH-002',
    module: 'Insights',
    screen: 'FinancialHealthPage',
    scenario: 'Verify debt-to-income ratio metric',
    expected: 'Should calculate correctly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FINHLTH-003',
    module: 'Insights',
    screen: 'FinancialHealthPage',
    scenario: 'Verify emergency fund status',
    expected: 'Should check against 3-6 month rule',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FINHLTH-004',
    module: 'Insights',
    screen: 'FinancialHealthPage',
    scenario: 'Verify savings rate percentage',
    expected: 'Should show % of income saved',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FINHLTH-005',
    module: 'Insights',
    screen: 'FinancialHealthPage',
    scenario: 'Verify recommendations to improve score',
    expected: 'Should list 3 actionable steps',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FINHLTH-006',
    module: 'Insights',
    screen: 'FinancialHealthPage',
    scenario: 'Verify clicking a metric explains it',
    expected: 'Should open tooltip/modal with details',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FINHLTH-007',
    module: 'Insights',
    screen: 'FinancialHealthPage',
    scenario: 'Verify historical score trend',
    expected: 'Should show if health is improving',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FINHLTH-008',
    module: 'Insights',
    screen: 'FinancialHealthPage',
    scenario: 'Verify animations of progress bars',
    expected: 'Bars should fill smoothly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FINHLTH-009',
    module: 'Insights',
    screen: 'FinancialHealthPage',
    scenario: 'Verify sharing health milestone',
    expected: 'Should allow sharing if score > 80',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-FINHLTH-010',
    module: 'Insights',
    screen: 'FinancialHealthPage',
    scenario: 'Verify offline behavior',
    expected: 'Should show cached score if offline',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALS-001',
    module: 'Goals',
    screen: 'GoalsListPage',
    scenario: 'Verify all active goals are listed',
    expected: 'Should display goal cards',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALS-002',
    module: 'Goals',
    screen: 'GoalsListPage',
    scenario: 'Verify progress bars for each goal',
    expected: 'Should show % complete based on saved amount',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALS-003',
    module: 'Goals',
    screen: 'GoalsListPage',
    scenario: 'Verify navigating to Add Goal',
    expected: 'Should open creation form',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALS-004',
    module: 'Goals',
    screen: 'GoalsListPage',
    scenario: 'Verify sorting goals by closest to completion',
    expected: 'Should reorder list',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALS-005',
    module: 'Goals',
    screen: 'GoalsListPage',
    scenario: 'Verify empty state when no goals exist',
    expected: 'Should encourage creating one',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALS-006',
    module: 'Goals',
    screen: 'GoalsListPage',
    scenario: 'Verify completed goals section',
    expected: 'Should list achieved goals',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALS-007',
    module: 'Goals',
    screen: 'GoalsListPage',
    scenario: 'Verify clicking goal opens details',
    expected: 'Should navigate to GoalDetailPage',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALS-008',
    module: 'Goals',
    screen: 'GoalsListPage',
    scenario: 'Verify total saved across all goals',
    expected: 'Should display aggregate sum',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALS-009',
    module: 'Goals',
    screen: 'GoalsListPage',
    scenario: 'Verify deleting a goal via swipe/menu',
    expected: 'Should prompt confirmation',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALS-010',
    module: 'Goals',
    screen: 'GoalsListPage',
    scenario: 'Verify targeted date indicator',
    expected: 'Should show if on track or behind',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDGOAL-001',
    module: 'Goals',
    screen: 'AddGoalPage',
    scenario: 'Verify successful goal creation',
    expected: 'Should save and appear in list',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDGOAL-002',
    module: 'Goals',
    screen: 'AddGoalPage',
    scenario: 'Verify mandatory fields validation',
    expected: 'Name and target amount are required',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDGOAL-003',
    module: 'Goals',
    screen: 'AddGoalPage',
    scenario: 'Verify target date selection',
    expected: 'Should allow choosing future date',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDGOAL-004',
    module: 'Goals',
    screen: 'AddGoalPage',
    scenario: 'Verify initial deposit amount',
    expected: 'Should allow adding starting balance',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDGOAL-005',
    module: 'Goals',
    screen: 'AddGoalPage',
    scenario: 'Verify icon/color selection for goal',
    expected: 'Should save visual preferences',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDGOAL-006',
    module: 'Goals',
    screen: 'AddGoalPage',
    scenario: 'Verify auto-save calculation',
    expected: 'Should preview required monthly savings',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDGOAL-007',
    module: 'Goals',
    screen: 'AddGoalPage',
    scenario: 'Verify cancel button works',
    expected: 'Should return to list without saving',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDGOAL-008',
    module: 'Goals',
    screen: 'AddGoalPage',
    scenario: 'Verify target amount zero validation',
    expected: 'Should prevent 0 target',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDGOAL-009',
    module: 'Goals',
    screen: 'AddGoalPage',
    scenario: 'Verify past date validation',
    expected: 'Should prevent selecting past target date',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-ADDGOAL-010',
    module: 'Goals',
    screen: 'AddGoalPage',
    scenario: 'Verify loading state on submit',
    expected: 'Should disable button during save',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALDTL-001',
    module: 'Goals',
    screen: 'GoalDetailPage',
    scenario: 'Verify goal details match list data',
    expected: 'Should show correct amount and dates',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALDTL-002',
    module: 'Goals',
    screen: 'GoalDetailPage',
    scenario: 'Verify "Add Funds" button works',
    expected: 'Should open deposit modal',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALDTL-003',
    module: 'Goals',
    screen: 'GoalDetailPage',
    scenario: 'Verify "Withdraw Funds" button works',
    expected: 'Should open withdraw modal',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALDTL-004',
    module: 'Goals',
    screen: 'GoalDetailPage',
    scenario: 'Verify progress circle/chart',
    expected: 'Should visualize % complete',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALDTL-005',
    module: 'Goals',
    screen: 'GoalDetailPage',
    scenario: 'Verify transaction history for goal',
    expected: 'Should list all deposits/withdrawals',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALDTL-006',
    module: 'Goals',
    screen: 'GoalDetailPage',
    scenario: 'Verify edit goal navigation',
    expected: 'Should open edit screen',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALDTL-007',
    module: 'Goals',
    screen: 'GoalDetailPage',
    scenario: 'Verify delete goal option',
    expected: 'Should allow deletion with confirmation',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALDTL-008',
    module: 'Goals',
    screen: 'GoalDetailPage',
    scenario: 'Verify AI projection for completion',
    expected: 'Should predict actual finish date',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALDTL-009',
    module: 'Goals',
    screen: 'GoalDetailPage',
    scenario: 'Verify celebration animation on 100%',
    expected: 'Should show confetti if fully funded',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALDTL-010',
    module: 'Goals',
    screen: 'GoalDetailPage',
    scenario: 'Verify sharing goal progress',
    expected: 'Should allow social share',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALPRG-001',
    module: 'Goals',
    screen: 'GoalProgressPage',
    scenario: 'Verify successful deposit submission',
    expected: 'Should update goal balance',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALPRG-002',
    module: 'Goals',
    screen: 'GoalProgressPage',
    scenario: 'Verify successful withdrawal submission',
    expected: 'Should decrease goal balance',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALPRG-003',
    module: 'Goals',
    screen: 'GoalProgressPage',
    scenario: 'Verify over-funding validation',
    expected: 'Should handle deposits > target',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALPRG-004',
    module: 'Goals',
    screen: 'GoalProgressPage',
    scenario: 'Verify over-withdrawing validation',
    expected: 'Should prevent withdrawing > current balance',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALPRG-005',
    module: 'Goals',
    screen: 'GoalProgressPage',
    scenario: 'Verify negative amount validation',
    expected: 'Should reject negative input',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALPRG-006',
    module: 'Goals',
    screen: 'GoalProgressPage',
    scenario: 'Verify date of transaction defaults to today',
    expected: 'Should prefill current date',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALPRG-007',
    module: 'Goals',
    screen: 'GoalProgressPage',
    scenario: 'Verify adding note to deposit',
    expected: 'Should save memo',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALPRG-008',
    module: 'Goals',
    screen: 'GoalProgressPage',
    scenario: 'Verify cancel returns to details',
    expected: 'Should discard action',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALPRG-009',
    module: 'Goals',
    screen: 'GoalProgressPage',
    scenario: 'Verify source account selection',
    expected: 'Should link deposit to a bank account',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-GOALPRG-010',
    module: 'Goals',
    screen: 'GoalProgressPage',
    scenario: 'Verify UI updates instantly on submit',
    expected: 'Progress bar should animate to new value',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITGOAL-001',
    module: 'Goals',
    screen: 'EditGoalPage',
    scenario: 'Verify successful update of target amount',
    expected: 'Should recalculate progress %',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITGOAL-002',
    module: 'Goals',
    screen: 'EditGoalPage',
    scenario: 'Verify successful update of target date',
    expected: 'Should update monthly required amount',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITGOAL-003',
    module: 'Goals',
    screen: 'EditGoalPage',
    scenario: 'Verify changing goal name',
    expected: 'Should save new name',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITGOAL-004',
    module: 'Goals',
    screen: 'EditGoalPage',
    scenario: 'Verify changing goal icon',
    expected: 'Should update visual representation',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITGOAL-005',
    module: 'Goals',
    screen: 'EditGoalPage',
    scenario: 'Verify validation for target < current balance',
    expected: 'Should warn if target is met immediately',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITGOAL-006',
    module: 'Goals',
    screen: 'EditGoalPage',
    scenario: 'Verify discard changes prompt',
    expected: 'Should warn on back navigation',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITGOAL-007',
    module: 'Goals',
    screen: 'EditGoalPage',
    scenario: 'Verify save button disabled if pristine',
    expected: 'Should only enable if changed',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITGOAL-008',
    module: 'Goals',
    screen: 'EditGoalPage',
    scenario: 'Verify loading spinner on save',
    expected: 'Should show feedback during API call',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITGOAL-009',
    module: 'Goals',
    screen: 'EditGoalPage',
    scenario: 'Verify API error handling',
    expected: 'Should show error toast if update fails',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITGOAL-010',
    module: 'Goals',
    screen: 'EditGoalPage',
    scenario: 'Verify returning to details on success',
    expected: 'Should navigate back and refresh',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AICHAT-001',
    module: 'AI Assistant',
    screen: 'ChatPage',
    scenario: 'Verify sending a message to AI',
    expected: 'Should display user message and fetch reply',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AICHAT-002',
    module: 'AI Assistant',
    screen: 'ChatPage',
    scenario: 'Verify AI response is rendered',
    expected: 'Should show formatted text/markdown',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AICHAT-003',
    module: 'AI Assistant',
    screen: 'ChatPage',
    scenario: 'Verify empty message validation',
    expected: 'Send button should be disabled',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AICHAT-004',
    module: 'AI Assistant',
    screen: 'ChatPage',
    scenario: 'Verify typing indicator',
    expected: 'Should show "AI is typing..." while waiting',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AICHAT-005',
    module: 'AI Assistant',
    screen: 'ChatPage',
    scenario: 'Verify quick action chips',
    expected: 'Clicking chip should auto-send message',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AICHAT-006',
    module: 'AI Assistant',
    screen: 'ChatPage',
    scenario: 'Verify scrolling to bottom on new message',
    expected: 'Chat should auto-scroll',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AICHAT-007',
    module: 'AI Assistant',
    screen: 'ChatPage',
    scenario: 'Verify error handling if AI times out',
    expected: 'Should show "Failed to connect" message',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AICHAT-008',
    module: 'AI Assistant',
    screen: 'ChatPage',
    scenario: 'Verify clearing chat history',
    expected: 'Should wipe messages from UI',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AICHAT-009',
    module: 'AI Assistant',
    screen: 'ChatPage',
    scenario: 'Verify rendering of charts in chat',
    expected: 'If AI returns chart data, should render component',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AICHAT-010',
    module: 'AI Assistant',
    screen: 'ChatPage',
    scenario: 'Verify session persistence',
    expected: 'Leaving and returning should keep chat history',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AISUGG-001',
    module: 'AI Assistant',
    screen: 'SuggestionsPage',
    scenario: 'Verify list of AI suggestions loads',
    expected: 'Should display actionable cards',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AISUGG-002',
    module: 'AI Assistant',
    screen: 'SuggestionsPage',
    scenario: 'Verify accepting a suggestion',
    expected: 'Should apply action (e.g., create budget)',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AISUGG-003',
    module: 'AI Assistant',
    screen: 'SuggestionsPage',
    scenario: 'Verify dismissing a suggestion',
    expected: 'Should remove card from list',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AISUGG-004',
    module: 'AI Assistant',
    screen: 'SuggestionsPage',
    scenario: 'Verify feedback thumbs up/down',
    expected: 'Should record user feedback',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AISUGG-005',
    module: 'AI Assistant',
    screen: 'SuggestionsPage',
    scenario: 'Verify categorization of suggestions',
    expected: 'Should group by Savings, Debt, etc.',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AISUGG-006',
    module: 'AI Assistant',
    screen: 'SuggestionsPage',
    scenario: 'Verify empty state when no suggestions',
    expected: 'Should say "You\'re doing great!"',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AISUGG-007',
    module: 'AI Assistant',
    screen: 'SuggestionsPage',
    scenario: 'Verify pull to refresh checks for new ideas',
    expected: 'Should trigger AI evaluation',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AISUGG-008',
    module: 'AI Assistant',
    screen: 'SuggestionsPage',
    scenario: 'Verify detail expansion on suggestion',
    expected: 'Clicking should show "Why this matters"',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AISUGG-009',
    module: 'AI Assistant',
    screen: 'SuggestionsPage',
    scenario: 'Verify dark mode styling',
    expected: 'Cards should have correct contrast',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AISUGG-010',
    module: 'AI Assistant',
    screen: 'SuggestionsPage',
    scenario: 'Verify navigation from suggestion to relevant page',
    expected: 'Should deep link to target screen',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AIBUDG-001',
    module: 'AI Assistant',
    screen: 'BudgetRecommendationPage',
    scenario: 'Verify AI generates budget plan',
    expected: 'Should output 50/30/20 or similar breakdown',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AIBUDG-002',
    module: 'AI Assistant',
    screen: 'BudgetRecommendationPage',
    scenario: 'Verify accepting the AI budget',
    expected: 'Should overwrite current budget settings',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AIBUDG-003',
    module: 'AI Assistant',
    screen: 'BudgetRecommendationPage',
    scenario: 'Verify rejecting/canceling AI budget',
    expected: 'Should discard and return',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AIBUDG-004',
    module: 'AI Assistant',
    screen: 'BudgetRecommendationPage',
    scenario: 'Verify adjusting AI sliders before accepting',
    expected: 'Should allow tweaking categories',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AIBUDG-005',
    module: 'AI Assistant',
    screen: 'BudgetRecommendationPage',
    scenario: 'Verify total sums to 100% of income',
    expected: 'Validation should enforce limits',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AIBUDG-006',
    module: 'AI Assistant',
    screen: 'BudgetRecommendationPage',
    scenario: 'Verify comparison to current budget',
    expected: 'Should show old vs new side by side',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AIBUDG-007',
    module: 'AI Assistant',
    screen: 'BudgetRecommendationPage',
    scenario: 'Verify loading animation during generation',
    expected: 'Should show thinking state (~3s)',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AIBUDG-008',
    module: 'AI Assistant',
    screen: 'BudgetRecommendationPage',
    scenario: 'Verify income change triggers regeneration prompt',
    expected: 'Should ask to update budget',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AIBUDG-009',
    module: 'AI Assistant',
    screen: 'BudgetRecommendationPage',
    scenario: 'Verify explanation of methodology',
    expected: 'Should explain why these numbers were chosen',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-AIBUDG-010',
    module: 'AI Assistant',
    screen: 'BudgetRecommendationPage',
    scenario: 'Verify exporting recommended budget',
    expected: 'Should download as PDF/CSV',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PROFILE-001',
    module: 'Profile & Settings',
    screen: 'ProfilePage',
    scenario: 'Verify user details are displayed',
    expected: 'Should show name, email, avatar',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PROFILE-002',
    module: 'Profile & Settings',
    screen: 'ProfilePage',
    scenario: 'Verify navigation to Edit Profile',
    expected: 'Should open edit screen',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PROFILE-003',
    module: 'Profile & Settings',
    screen: 'ProfilePage',
    scenario: 'Verify displaying membership/tier status',
    expected: 'Should show Free/Pro badge',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PROFILE-004',
    module: 'Profile & Settings',
    screen: 'ProfilePage',
    scenario: 'Verify stats summary (member since, total tracked)',
    expected: 'Should display correct stats',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PROFILE-005',
    module: 'Profile & Settings',
    screen: 'ProfilePage',
    scenario: 'Verify logout button logs user out',
    expected: 'Should clear session and go to login',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PROFILE-006',
    module: 'Profile & Settings',
    screen: 'ProfilePage',
    scenario: 'Verify delete account option is accessible',
    expected: 'Should navigate to danger zone',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PROFILE-007',
    module: 'Profile & Settings',
    screen: 'ProfilePage',
    scenario: 'Verify pull to refresh updates profile',
    expected: 'Should fetch latest user data',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PROFILE-008',
    module: 'Profile & Settings',
    screen: 'ProfilePage',
    scenario: 'Verify offline mode handles gracefully',
    expected: 'Should show cached data',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PROFILE-009',
    module: 'Profile & Settings',
    screen: 'ProfilePage',
    scenario: 'Verify avatar image loads correctly',
    expected: 'Should show image or placeholder initial',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PROFILE-010',
    module: 'Profile & Settings',
    screen: 'ProfilePage',
    scenario: 'Verify dark mode toggle shortcut',
    expected: 'Should switch theme instantly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITPROF-001',
    module: 'Profile & Settings',
    screen: 'EditProfilePage',
    scenario: 'Verify updating display name',
    expected: 'Should save and reflect on profile',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITPROF-002',
    module: 'Profile & Settings',
    screen: 'EditProfilePage',
    scenario: 'Verify updating phone number',
    expected: 'Should validate format and save',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITPROF-003',
    module: 'Profile & Settings',
    screen: 'EditProfilePage',
    scenario: 'Verify uploading new avatar',
    expected: 'Should allow image selection and upload',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITPROF-004',
    module: 'Profile & Settings',
    screen: 'EditProfilePage',
    scenario: 'Verify removing avatar',
    expected: 'Should revert to default initial',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITPROF-005',
    module: 'Profile & Settings',
    screen: 'EditProfilePage',
    scenario: 'Verify empty name validation',
    expected: 'Should prevent saving empty name',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITPROF-006',
    module: 'Profile & Settings',
    screen: 'EditProfilePage',
    scenario: 'Verify discard changes prompt',
    expected: 'Should warn if navigating back with changes',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITPROF-007',
    module: 'Profile & Settings',
    screen: 'EditProfilePage',
    scenario: 'Verify loading state during save',
    expected: 'Button should show spinner',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITPROF-008',
    module: 'Profile & Settings',
    screen: 'EditProfilePage',
    scenario: 'Verify API error handling on save',
    expected: 'Should show toast message',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITPROF-009',
    module: 'Profile & Settings',
    screen: 'EditProfilePage',
    scenario: 'Verify email address is read-only or requires auth',
    expected: 'Should have disabled field or distinct flow',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-EDITPROF-010',
    module: 'Profile & Settings',
    screen: 'EditProfilePage',
    scenario: 'Verify save button only enabled on change',
    expected: 'Should prevent redundant saves',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SETTINGS-001',
    module: 'Profile & Settings',
    screen: 'SettingsPage',
    scenario: 'Verify navigation to Security',
    expected: 'Should open security page',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SETTINGS-002',
    module: 'Profile & Settings',
    screen: 'SettingsPage',
    scenario: 'Verify navigation to Preferences',
    expected: 'Should open preferences page',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SETTINGS-003',
    module: 'Profile & Settings',
    screen: 'SettingsPage',
    scenario: 'Verify navigation to Notifications',
    expected: 'Should open notifications page',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SETTINGS-004',
    module: 'Profile & Settings',
    screen: 'SettingsPage',
    scenario: 'Verify navigation to Help',
    expected: 'Should open help page',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SETTINGS-005',
    module: 'Profile & Settings',
    screen: 'SettingsPage',
    scenario: 'Verify app version is displayed at bottom',
    expected: 'Should show vX.Y.Z',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SETTINGS-006',
    module: 'Profile & Settings',
    screen: 'SettingsPage',
    scenario: 'Verify terms of service link',
    expected: 'Should open external browser or modal',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SETTINGS-007',
    module: 'Profile & Settings',
    screen: 'SettingsPage',
    scenario: 'Verify privacy policy link',
    expected: 'Should open external browser or modal',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SETTINGS-008',
    module: 'Profile & Settings',
    screen: 'SettingsPage',
    scenario: 'Verify rate the app button',
    expected: 'Should trigger store review prompt',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SETTINGS-009',
    module: 'Profile & Settings',
    screen: 'SettingsPage',
    scenario: 'Verify clear cache option',
    expected: 'Should clear local storage and show success',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SETTINGS-010',
    module: 'Profile & Settings',
    screen: 'SettingsPage',
    scenario: 'Verify responsiveness on tablet layout',
    expected: 'Should use split pane or widened list',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SECURITY-001',
    module: 'Profile & Settings',
    screen: 'SecurityPage',
    scenario: 'Verify changing password',
    expected: 'Should require old and new password and succeed',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SECURITY-002',
    module: 'Profile & Settings',
    screen: 'SecurityPage',
    scenario: 'Verify incorrect old password error',
    expected: 'Should reject change',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SECURITY-003',
    module: 'Profile & Settings',
    screen: 'SecurityPage',
    scenario: 'Verify password strength on new password',
    expected: 'Should enforce requirements',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SECURITY-004',
    module: 'Profile & Settings',
    screen: 'SecurityPage',
    scenario: 'Verify enabling Two-Factor Auth (2FA)',
    expected: 'Should initiate 2FA setup flow',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SECURITY-005',
    module: 'Profile & Settings',
    screen: 'SecurityPage',
    scenario: 'Verify disabling 2FA',
    expected: 'Should require confirmation and disable',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SECURITY-006',
    module: 'Profile & Settings',
    screen: 'SecurityPage',
    scenario: 'Verify active sessions list',
    expected: 'Should show devices currently logged in',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SECURITY-007',
    module: 'Profile & Settings',
    screen: 'SecurityPage',
    scenario: 'Verify revoking a session',
    expected: 'Should log out the selected device',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SECURITY-008',
    module: 'Profile & Settings',
    screen: 'SecurityPage',
    scenario: 'Verify biometric login toggle (WebAuthn)',
    expected: 'Should prompt for fingerprint/FaceID',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SECURITY-009',
    module: 'Profile & Settings',
    screen: 'SecurityPage',
    scenario: 'Verify PIN code lock setup',
    expected: 'Should allow setting an app PIN',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-SECURITY-010',
    module: 'Profile & Settings',
    screen: 'SecurityPage',
    scenario: 'Verify locking app immediately',
    expected: 'Should mask screen requiring PIN/Biometric',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PREFS-001',
    module: 'Profile & Settings',
    screen: 'PreferencesPage',
    scenario: 'Verify changing currency symbol',
    expected: 'Should update globally across app',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PREFS-002',
    module: 'Profile & Settings',
    screen: 'PreferencesPage',
    scenario: 'Verify changing date format',
    expected: 'Should reflect in all lists (MM/DD vs DD/MM)',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PREFS-003',
    module: 'Profile & Settings',
    screen: 'PreferencesPage',
    scenario: 'Verify changing language',
    expected: 'Should translate UI instantly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PREFS-004',
    module: 'Profile & Settings',
    screen: 'PreferencesPage',
    scenario: 'Verify theme selection (Light/Dark/System)',
    expected: 'Should apply theme correctly',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PREFS-005',
    module: 'Profile & Settings',
    screen: 'PreferencesPage',
    scenario: 'Verify start of week setting (Sun vs Mon)',
    expected: 'Should affect calendars and weekly reports',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PREFS-006',
    module: 'Profile & Settings',
    screen: 'PreferencesPage',
    scenario: 'Verify hiding balances mode (Privacy blur)',
    expected: 'Should blur all amounts',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PREFS-007',
    module: 'Profile & Settings',
    screen: 'PreferencesPage',
    scenario: 'Verify default account selection',
    expected: 'Should pre-select this account on new txns',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PREFS-008',
    module: 'Profile & Settings',
    screen: 'PreferencesPage',
    scenario: 'Verify data export option',
    expected: 'Should allow downloading all user data',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PREFS-009',
    module: 'Profile & Settings',
    screen: 'PreferencesPage',
    scenario: 'Verify resetting preferences to default',
    expected: 'Should restore original settings',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-PREFS-010',
    module: 'Profile & Settings',
    screen: 'PreferencesPage',
    scenario: 'Verify changes persist after app reload',
    expected: 'Settings should save to backend/storage',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-HELP-001',
    module: 'Profile & Settings',
    screen: 'HelpPage',
    scenario: 'Verify FAQ accordion functions',
    expected: 'Should expand/collapse answers',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-HELP-002',
    module: 'Profile & Settings',
    screen: 'HelpPage',
    scenario: 'Verify searching FAQs',
    expected: 'Should filter list based on query',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-HELP-003',
    module: 'Profile & Settings',
    screen: 'HelpPage',
    scenario: 'Verify "Contact Support" opens form',
    expected: 'Should allow sending email/ticket',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-HELP-004',
    module: 'Profile & Settings',
    screen: 'HelpPage',
    scenario: 'Verify empty support message validation',
    expected: 'Should require text before sending',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-HELP-005',
    module: 'Profile & Settings',
    screen: 'HelpPage',
    scenario: 'Verify success message after contacting support',
    expected: 'Should show confirmation toast',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-HELP-006',
    module: 'Profile & Settings',
    screen: 'HelpPage',
    scenario: 'Verify link to video tutorials',
    expected: 'Should navigate to YouTube or internal player',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-HELP-007',
    module: 'Profile & Settings',
    screen: 'HelpPage',
    scenario: 'Verify community forum link',
    expected: 'Should open in new tab',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-HELP-008',
    module: 'Profile & Settings',
    screen: 'HelpPage',
    scenario: 'Verify live chat widget initiation',
    expected: 'Should open chat interface',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-HELP-009',
    module: 'Profile & Settings',
    screen: 'HelpPage',
    scenario: 'Verify report a bug option',
    expected: 'Should include diagnostic info attachment',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-HELP-010',
    module: 'Profile & Settings',
    screen: 'HelpPage',
    scenario: 'Verify offline behavior for help content',
    expected: 'Should show cached FAQs',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-NOTIF-001',
    module: 'Profile & Settings',
    screen: 'NotificationsPage',
    scenario: 'Verify toggling push notifications',
    expected: 'Should prompt for browser permission',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-NOTIF-002',
    module: 'Profile & Settings',
    screen: 'NotificationsPage',
    scenario: 'Verify toggling email notifications',
    expected: 'Should update backend preferences',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-NOTIF-003',
    module: 'Profile & Settings',
    screen: 'NotificationsPage',
    scenario: 'Verify daily reminder time selection',
    expected: 'Should allow picking a time',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-NOTIF-004',
    module: 'Profile & Settings',
    screen: 'NotificationsPage',
    scenario: 'Verify weekly summary toggle',
    expected: 'Should enable/disable weekly digest',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-NOTIF-005',
    module: 'Profile & Settings',
    screen: 'NotificationsPage',
    scenario: 'Verify large transaction alert threshold',
    expected: 'Should allow setting a custom amount',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-NOTIF-006',
    module: 'Profile & Settings',
    screen: 'NotificationsPage',
    scenario: 'Verify budget warning toggle (50%, 80%, 100%)',
    expected: 'Should save selected thresholds',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-NOTIF-007',
    module: 'Profile & Settings',
    screen: 'NotificationsPage',
    scenario: 'Verify goal milestone alerts',
    expected: 'Should enable celebration notifications',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-NOTIF-008',
    module: 'Profile & Settings',
    screen: 'NotificationsPage',
    scenario: 'Verify AI insights notification toggle',
    expected: 'Should opt-in to smart alerts',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-NOTIF-009',
    module: 'Profile & Settings',
    screen: 'NotificationsPage',
    scenario: 'Verify disabling all notifications master switch',
    expected: 'Should turn off all toggles',
    status: 'Pending'
  },
  {
    id: 'TC-WEB-NOTIF-010',
    module: 'Profile & Settings',
    screen: 'NotificationsPage',
    scenario: 'Verify testing a notification',
    expected: 'Should trigger a sample local notification',
    status: 'Pending'
  },
];
