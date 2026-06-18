const fs = require('fs');

const screenData = [
  {
    screen: 'SplashScreen', module: 'Shared & Onboarding', prefix: 'TC-WEB-SPLASH',
    scenarios: [
      ['Verify splash screen loads successfully', 'Splash screen should be visible'],
      ['Verify app logo is displayed', 'Logo should be rendered correctly'],
      ['Verify background color matches theme', 'Background color should be accurate'],
      ['Verify splash screen timeout transitions to welcome screen', 'Should navigate to welcome after delay'],
      ['Verify animation executes smoothly', 'Animation finishes without stutter'],
      ['Verify back button is disabled during splash', 'Cannot navigate back from splash'],
      ['Verify text content is localized', 'Text should match user locale'],
      ['Verify network error handling during initialization', 'Should show retry if initialization fails'],
      ['Verify auto-login if token exists', 'Should transition to dashboard if authenticated'],
      ['Verify performance load time is under 2 seconds', 'Splash should vanish under 2s']
    ]
  },
  {
    screen: 'WelcomeScreen', module: 'Shared & Onboarding', prefix: 'TC-WEB-WELCOME',
    scenarios: [
      ['Verify welcome screen loads', 'Welcome screen should be visible'],
      ['Verify "Get Started" button exists', 'Button should be present and clickable'],
      ['Verify "Login" link navigates to login page', 'Should navigate to login page on click'],
      ['Verify onboarding carousel works', 'Carousel should swipe correctly'],
      ['Verify skipping onboarding', 'Skip button should skip to end'],
      ['Verify illustrations load', 'Images should not be broken'],
      ['Verify responsive layout on welcome', 'Should adapt to screen size'],
      ['Verify accessibility labels on buttons', 'Screen readers should read labels'],
      ['Verify terms and conditions link', 'Should open terms modal or page'],
      ['Verify privacy policy link', 'Should open privacy page']
    ]
  },
  {
    screen: 'NotFoundPage', module: 'Shared & Onboarding', prefix: 'TC-WEB-404',
    scenarios: [
      ['Verify 404 page renders for invalid URLs', '404 screen should be shown'],
      ['Verify "Go Home" button works', 'Should navigate to dashboard/home'],
      ['Verify error message is clear', 'Should display user-friendly error text'],
      ['Verify 404 image is rendered', 'Image should be visible'],
      ['Verify layout on mobile screens', 'Should be centered on mobile'],
      ['Verify language translation for 404', 'Text should change according to locale'],
      ['Verify back button functionality', 'Should return to previous valid page'],
      ['Verify header/footer are still accessible', 'Navigation wrapper should remain'],
      ['Verify dark mode support on 404', 'Colors should adapt to dark mode'],
      ['Verify analytics event is fired for 404', 'Should log error to analytics']
    ]
  },
  {
    screen: 'LoginPage', module: 'Authentication', prefix: 'TC-WEB-LOGIN',
    scenarios: [
      ['Verify successful login with valid credentials', 'User should be redirected to Dashboard'],
      ['Verify invalid password displays error', 'Error message should be shown'],
      ['Verify empty email validation', 'Validation message "Email is required" should appear'],
      ['Verify empty password validation', 'Validation message "Password is required" should appear'],
      ['Verify invalid email format validation', 'Should enforce valid email format'],
      ['Verify "Forgot Password" link works', 'Should navigate to forgot password page'],
      ['Verify "Sign Up" link navigates to signup', 'Should navigate to signup page'],
      ['Verify password visibility toggle', 'Password should toggle between text and dots'],
      ['Verify remember me checkbox', 'Should persist session if checked'],
      ['Verify login button is disabled while submitting', 'Button should show loading state']
    ]
  },
  {
    screen: 'SignupPage', module: 'Authentication', prefix: 'TC-WEB-SIGNUP',
    scenarios: [
      ['Verify successful registration', 'Account should be created and user logged in'],
      ['Verify existing email error', 'Should show "Email already in use" error'],
      ['Verify password strength validation', 'Should enforce strong password criteria'],
      ['Verify passwords match validation', 'Confirm password should match password'],
      ['Verify empty fields validation', 'Should highlight all required fields'],
      ['Verify terms acceptance checkbox', 'Must check terms to proceed'],
      ['Verify social sign-up options exist', 'Google/Apple sign-up buttons should be visible'],
      ['Verify navigating back to login', 'Login link should work'],
      ['Verify input limits on name field', 'Name should have a max length'],
      ['Verify submission loading state', 'Button should show spinner']
    ]
  },
  {
    screen: 'ForgotPasswordPage', module: 'Authentication', prefix: 'TC-WEB-FORGOTPWD',
    scenarios: [
      ['Verify valid email sends reset link', 'Success message should appear'],
      ['Verify unregistered email error', 'Should handle unknown email safely'],
      ['Verify empty email validation', 'Should require email input'],
      ['Verify invalid email format', 'Should enforce email format'],
      ['Verify back to login link', 'Should return to login page'],
      ['Verify resend link cooldown', 'Should prevent spamming resend'],
      ['Verify loading state on submit', 'Button should show spinner'],
      ['Verify keyboard enter submits form', 'Enter key should trigger submission'],
      ['Verify dark mode styling', 'Input should be legible in dark mode'],
      ['Verify screen reader accessibility', 'Input should have correct aria-labels']
    ]
  },
  {
    screen: 'ResetPasswordPage', module: 'Authentication', prefix: 'TC-WEB-RESETPWD',
    scenarios: [
      ['Verify successful password reset', 'Should show success and redirect to login'],
      ['Verify invalid or expired token error', 'Should show token expiration message'],
      ['Verify new password strength validation', 'Should require secure password'],
      ['Verify confirm new password matches', 'Should reject non-matching passwords'],
      ['Verify password visibility toggle', 'Should toggle text visibility'],
      ['Verify empty fields validation', 'Should prevent empty submissions'],
      ['Verify back to login navigation', 'Should allow user to cancel'],
      ['Verify submission loading state', 'Button should be disabled during request'],
      ['Verify session is cleared after reset', 'User should need to login again'],
      ['Verify UI layout responsiveness', 'Should look good on mobile devices']
    ]
  },
  {
    screen: 'DashboardPage', module: 'Dashboard', prefix: 'TC-WEB-DASH',
    scenarios: [
      ['Verify total balance is displayed accurately', 'Balance should reflect sum of accounts'],
      ['Verify recent transactions widget loads data', 'Should display list of recent txns'],
      ['Verify "Add Transaction" quick action works', 'Should navigate to add transaction'],
      ['Verify expenses breakdown chart renders', 'Pie chart should be visible'],
      ['Verify pull-to-refresh / manual refresh updates data', 'Data should sync with server'],
      ['Verify greeting changes based on time of day', 'Should say Good Morning/Evening'],
      ['Verify AI suggestion widget is visible', 'Should display AI tip'],
      ['Verify notification bell indicates unread count', 'Badge should show count'],
      ['Verify navigating to full transaction list', 'View All should navigate to list'],
      ['Verify skeleton loaders appear while fetching', 'Should show loading state initially']
    ]
  },
  {
    screen: 'TransactionListPage', module: 'Finance', prefix: 'TC-WEB-TRXLIST',
    scenarios: [
      ['Verify all transactions are listed chronologically', 'Should be sorted by date desc'],
      ['Verify search by transaction name', 'Should filter list by search query'],
      ['Verify filter by category', 'Should only show selected category txns'],
      ['Verify filter by date range', 'Should restrict to selected dates'],
      ['Verify pagination or infinite scroll', 'Should load more items on scroll'],
      ['Verify clicking a transaction opens details', 'Should navigate to details page'],
      ['Verify swipe or menu to delete transaction', 'Should prompt for deletion'],
      ['Verify empty state when no transactions exist', 'Should show empty placeholder'],
      ['Verify income vs expense indicators', 'Should have green/red color coding'],
      ['Verify total amount matches filtered list', 'Header total should update dynamically']
    ]
  },
  {
    screen: 'AddTransactionPage', module: 'Finance', prefix: 'TC-WEB-ADDTRX',
    scenarios: [
      ['Verify successful addition of an expense', 'Should save and return to list'],
      ['Verify successful addition of income', 'Should save as positive amount'],
      ['Verify required amount validation', 'Should show error if amount is 0/empty'],
      ['Verify category selection dropdown', 'Should list all available categories'],
      ['Verify date picker selection', 'Should allow choosing a past date'],
      ['Verify notes field accepts long text', 'Should save description properly'],
      ['Verify receipt image upload', 'Should allow attaching an image'],
      ['Verify cancel button works', 'Should navigate back without saving'],
      ['Verify invalid amount format (letters)', 'Should prevent non-numeric input'],
      ['Verify adding custom category inline', 'Should allow creating new category']
    ]
  },
  {
    screen: 'TransactionDetailPage', module: 'Finance', prefix: 'TC-WEB-TRXDTL',
    scenarios: [
      ['Verify transaction details are displayed correctly', 'Should show amount, date, category'],
      ['Verify receipt image can be viewed full screen', 'Clicking image should expand it'],
      ['Verify edit button navigates to edit screen', 'Should open edit mode'],
      ['Verify delete button prompts confirmation', 'Should show confirmation dialog'],
      ['Verify deleting from details page', 'Should delete and return to list'],
      ['Verify back button returns to previous list', 'Should navigate back correctly'],
      ['Verify shared transaction indicator', 'Should show if split with someone'],
      ['Verify category icon is correct', 'Should display mapped icon for category'],
      ['Verify notes are fully displayed', 'Long notes should not be truncated'],
      ['Verify dark mode text colors', 'Details should be readable in dark theme']
    ]
  },
  {
    screen: 'EditTransactionPage', module: 'Finance', prefix: 'TC-WEB-EDITTRX',
    scenarios: [
      ['Verify successful edit of amount', 'Should save new amount and reflect in list'],
      ['Verify changing category updates icon', 'Should save new category'],
      ['Verify removing receipt image', 'Should successfully detach image'],
      ['Verify discard changes prompt on back', 'Should warn if unsaved changes exist'],
      ['Verify save button disabled if no changes', 'Button should only enable on edit'],
      ['Verify empty amount validation on edit', 'Should prevent saving 0/empty amount'],
      ['Verify date change updates chronological order', 'Should save new date correctly'],
      ['Verify loading state during save', 'Should show spinner on save button'],
      ['Verify error handling if API fails on save', 'Should show toast error message'],
      ['Verify cancel returns to details page', 'Should abandon edits']
    ]
  },
  {
    screen: 'CategoryBreakdownPage', module: 'Finance', prefix: 'TC-WEB-CATBRK',
    scenarios: [
      ['Verify pie chart displays all categories', 'Chart should render slices properly'],
      ['Verify total spent matches sum of categories', 'Total should be mathematically correct'],
      ['Verify clicking slice shows category details', 'Should filter transactions by category'],
      ['Verify changing month updates breakdown', 'Data should reflect selected month'],
      ['Verify empty state for month with no expenses', 'Should show "No data" placeholder'],
      ['Verify legend matches chart colors', 'Colors should map correctly'],
      ['Verify percentage calculation accuracy', 'Percentages should sum to ~100%'],
      ['Verify excluding specific category from view', 'Should toggle category visibility'],
      ['Verify exporting breakdown data', 'Should download CSV/PDF report'],
      ['Verify animation when chart loads', 'Chart should animate in smoothly']
    ]
  },
  {
    screen: 'MonthlyReportPage', module: 'Finance', prefix: 'TC-WEB-MTHREP',
    scenarios: [
      ['Verify monthly summary metrics load', 'Income/Expense/Savings should be visible'],
      ['Verify month selector dropdown', 'Should allow selecting previous months'],
      ['Verify bar chart for daily spending', 'Chart should render correctly'],
      ['Verify top 3 expenses section', 'Should list highest transactions'],
      ['Verify comparison with previous month', 'Should show % up or down'],
      ['Verify empty month handles gracefully', 'Should show zero states'],
      ['Verify sharing the report', 'Share button should invoke native share/copy link'],
      ['Verify budget vs actual progress bar', 'Should show how much budget is used'],
      ['Verify AI insights for the month', 'Should show generated summary'],
      ['Verify PDF download of monthly report', 'Should generate and download PDF']
    ]
  },
  {
    screen: 'RecurringExpensesPage', module: 'Finance', prefix: 'TC-WEB-RECEXP',
    scenarios: [
      ['Verify list of active subscriptions', 'Should display all recurring items'],
      ['Verify total monthly recurring cost', 'Should calculate total accurately'],
      ['Verify upcoming payments highlighted', 'Items due soon should be marked'],
      ['Verify marking an expense as paid', 'Should record transaction and update next due'],
      ['Verify pausing a subscription', 'Should move to inactive list'],
      ['Verify deleting a recurring expense', 'Should remove from list'],
      ['Verify empty state for no subscriptions', 'Should show "Add your first..." message'],
      ['Verify sorting by due date', 'Should order items correctly'],
      ['Verify auto-pay indicator', 'Should show which are automated'],
      ['Verify navigation to add new recurring', 'Should open add page']
    ]
  },
  {
    screen: 'AddRecurringExpensePage', module: 'Finance', prefix: 'TC-WEB-ADDREC',
    scenarios: [
      ['Verify successful creation of monthly expense', 'Should save and appear in list'],
      ['Verify frequency selection (Weekly/Monthly/Yearly)', 'Should handle all frequencies'],
      ['Verify next due date calculation', 'Should preview correct next date'],
      ['Verify validation for empty name/amount', 'Should require mandatory fields'],
      ['Verify setting reminder toggle', 'Should allow setting days before reminder'],
      ['Verify category assignment', 'Should link to budget category'],
      ['Verify selecting auto-pay status', 'Should save auto-pay flag'],
      ['Verify cancel button behavior', 'Should return without saving'],
      ['Verify duplicate subscription warning', 'Should warn if similar name exists'],
      ['Verify saving state disables button', 'Should show loading spinner']
    ]
  },
  {
    screen: 'InsightsOverviewPage', module: 'Insights', prefix: 'TC-WEB-INSOVR',
    scenarios: [
      ['Verify overall financial score is displayed', 'Should show health score'],
      ['Verify top spending alert', 'Should highlight unusual spending'],
      ['Verify savings opportunity suggestion', 'Should display AI recommendation'],
      ['Verify navigation to weekly report', 'Should open weekly details'],
      ['Verify navigation to cash flow', 'Should open cash flow details'],
      ['Verify pull to refresh insights', 'Should regenerate/fetch new data'],
      ['Verify empty state for new users', 'Should prompt to add more data'],
      ['Verify dismissing an insight card', 'Card should be removed from view'],
      ['Verify tooltips for complex metrics', 'Should explain what the metric means'],
      ['Verify layout breaks on small screens', 'Cards should stack vertically']
    ]
  },
  {
    screen: 'WeeklyReportPage', module: 'Insights', prefix: 'TC-WEB-WKREP',
    scenarios: [
      ['Verify week-over-week spending comparison', 'Should show % change'],
      ['Verify day-by-day bar chart', 'Should display 7 bars for the week'],
      ['Verify highest spending day identified', 'Should highlight peak day'],
      ['Verify navigating to previous week', 'Should load past week data'],
      ['Verify weekend vs weekday breakdown', 'Should display proportion'],
      ['Verify empty state for no data week', 'Should show zero metrics'],
      ['Verify category with highest increase', 'Should flag anomaly category'],
      ['Verify closing the report returns to insights', 'Should navigate back'],
      ['Verify sharing weekly summary', 'Should format shareable text'],
      ['Verify chart tooltips on hover/tap', 'Should show exact daily amount']
    ]
  },
  {
    screen: 'CashFlowPage', module: 'Insights', prefix: 'TC-WEB-CASHFLW',
    scenarios: [
      ['Verify Income vs Expense line chart', 'Should plot two distinct lines'],
      ['Verify net cash flow calculation', 'Should show Income minus Expenses'],
      ['Verify changing timeframe (3M/6M/1Y)', 'Chart should adjust data points'],
      ['Verify negative cash flow highlighting', 'Should show warning if expenses > income'],
      ['Verify hovering on chart nodes', 'Should show precise monthly data'],
      ['Verify list of top income sources', 'Should display highest earners'],
      ['Verify list of top expense categories', 'Should display highest drainers'],
      ['Verify loading skeleton for heavy data', 'Should show loader during calculation'],
      ['Verify projection for current month', 'Should show dotted line for expected end'],
      ['Verify exporting cash flow data', 'Should download CSV format']
    ]
  },
  {
    screen: 'PredictionsPage', module: 'Insights', prefix: 'TC-WEB-PRED',
    scenarios: [
      ['Verify AI end-of-month balance prediction', 'Should show estimated balance'],
      ['Verify upcoming bills are factored in', 'Should list deducted upcoming bills'],
      ['Verify warning for potential overdraft', 'Should alert if prediction is < 0'],
      ['Verify adjusting prediction parameters', 'Should allow "what if" scenarios'],
      ['Verify accuracy indicator', 'Should show confidence level of prediction'],
      ['Verify historical prediction accuracy', 'Should show past performance of AI'],
      ['Verify empty state if not enough data', 'Should say requires 1+ month of data'],
      ['Verify graphic visualization of trajectory', 'Should show funnel/cone chart'],
      ['Verify actionable advice to improve prediction', 'Should suggest lowering X expense'],
      ['Verify dark mode contrast for charts', 'Should be legible in dark theme']
    ]
  },
  {
    screen: 'FinancialHealthPage', module: 'Insights', prefix: 'TC-WEB-FINHLTH',
    scenarios: [
      ['Verify overall health score dial', 'Should render score from 0-100'],
      ['Verify debt-to-income ratio metric', 'Should calculate correctly'],
      ['Verify emergency fund status', 'Should check against 3-6 month rule'],
      ['Verify savings rate percentage', 'Should show % of income saved'],
      ['Verify recommendations to improve score', 'Should list 3 actionable steps'],
      ['Verify clicking a metric explains it', 'Should open tooltip/modal with details'],
      ['Verify historical score trend', 'Should show if health is improving'],
      ['Verify animations of progress bars', 'Bars should fill smoothly'],
      ['Verify sharing health milestone', 'Should allow sharing if score > 80'],
      ['Verify offline behavior', 'Should show cached score if offline']
    ]
  },
  {
    screen: 'GoalsListPage', module: 'Goals', prefix: 'TC-WEB-GOALS',
    scenarios: [
      ['Verify all active goals are listed', 'Should display goal cards'],
      ['Verify progress bars for each goal', 'Should show % complete based on saved amount'],
      ['Verify navigating to Add Goal', 'Should open creation form'],
      ['Verify sorting goals by closest to completion', 'Should reorder list'],
      ['Verify empty state when no goals exist', 'Should encourage creating one'],
      ['Verify completed goals section', 'Should list achieved goals'],
      ['Verify clicking goal opens details', 'Should navigate to GoalDetailPage'],
      ['Verify total saved across all goals', 'Should display aggregate sum'],
      ['Verify deleting a goal via swipe/menu', 'Should prompt confirmation'],
      ['Verify targeted date indicator', 'Should show if on track or behind']
    ]
  },
  {
    screen: 'AddGoalPage', module: 'Goals', prefix: 'TC-WEB-ADDGOAL',
    scenarios: [
      ['Verify successful goal creation', 'Should save and appear in list'],
      ['Verify mandatory fields validation', 'Name and target amount are required'],
      ['Verify target date selection', 'Should allow choosing future date'],
      ['Verify initial deposit amount', 'Should allow adding starting balance'],
      ['Verify icon/color selection for goal', 'Should save visual preferences'],
      ['Verify auto-save calculation', 'Should preview required monthly savings'],
      ['Verify cancel button works', 'Should return to list without saving'],
      ['Verify target amount zero validation', 'Should prevent 0 target'],
      ['Verify past date validation', 'Should prevent selecting past target date'],
      ['Verify loading state on submit', 'Should disable button during save']
    ]
  },
  {
    screen: 'GoalDetailPage', module: 'Goals', prefix: 'TC-WEB-GOALDTL',
    scenarios: [
      ['Verify goal details match list data', 'Should show correct amount and dates'],
      ['Verify "Add Funds" button works', 'Should open deposit modal'],
      ['Verify "Withdraw Funds" button works', 'Should open withdraw modal'],
      ['Verify progress circle/chart', 'Should visualize % complete'],
      ['Verify transaction history for goal', 'Should list all deposits/withdrawals'],
      ['Verify edit goal navigation', 'Should open edit screen'],
      ['Verify delete goal option', 'Should allow deletion with confirmation'],
      ['Verify AI projection for completion', 'Should predict actual finish date'],
      ['Verify celebration animation on 100%', 'Should show confetti if fully funded'],
      ['Verify sharing goal progress', 'Should allow social share']
    ]
  },
  {
    screen: 'GoalProgressPage', module: 'Goals', prefix: 'TC-WEB-GOALPRG',
    scenarios: [
      ['Verify successful deposit submission', 'Should update goal balance'],
      ['Verify successful withdrawal submission', 'Should decrease goal balance'],
      ['Verify over-funding validation', 'Should handle deposits > target'],
      ['Verify over-withdrawing validation', 'Should prevent withdrawing > current balance'],
      ['Verify negative amount validation', 'Should reject negative input'],
      ['Verify date of transaction defaults to today', 'Should prefill current date'],
      ['Verify adding note to deposit', 'Should save memo'],
      ['Verify cancel returns to details', 'Should discard action'],
      ['Verify source account selection', 'Should link deposit to a bank account'],
      ['Verify UI updates instantly on submit', 'Progress bar should animate to new value']
    ]
  },
  {
    screen: 'EditGoalPage', module: 'Goals', prefix: 'TC-WEB-EDITGOAL',
    scenarios: [
      ['Verify successful update of target amount', 'Should recalculate progress %'],
      ['Verify successful update of target date', 'Should update monthly required amount'],
      ['Verify changing goal name', 'Should save new name'],
      ['Verify changing goal icon', 'Should update visual representation'],
      ['Verify validation for target < current balance', 'Should warn if target is met immediately'],
      ['Verify discard changes prompt', 'Should warn on back navigation'],
      ['Verify save button disabled if pristine', 'Should only enable if changed'],
      ['Verify loading spinner on save', 'Should show feedback during API call'],
      ['Verify API error handling', 'Should show error toast if update fails'],
      ['Verify returning to details on success', 'Should navigate back and refresh']
    ]
  },
  {
    screen: 'ChatPage', module: 'AI Assistant', prefix: 'TC-WEB-AICHAT',
    scenarios: [
      ['Verify sending a message to AI', 'Should display user message and fetch reply'],
      ['Verify AI response is rendered', 'Should show formatted text/markdown'],
      ['Verify empty message validation', 'Send button should be disabled'],
      ['Verify typing indicator', 'Should show "AI is typing..." while waiting'],
      ['Verify quick action chips', 'Clicking chip should auto-send message'],
      ['Verify scrolling to bottom on new message', 'Chat should auto-scroll'],
      ['Verify error handling if AI times out', 'Should show "Failed to connect" message'],
      ['Verify clearing chat history', 'Should wipe messages from UI'],
      ['Verify rendering of charts in chat', 'If AI returns chart data, should render component'],
      ['Verify session persistence', 'Leaving and returning should keep chat history']
    ]
  },
  {
    screen: 'SuggestionsPage', module: 'AI Assistant', prefix: 'TC-WEB-AISUGG',
    scenarios: [
      ['Verify list of AI suggestions loads', 'Should display actionable cards'],
      ['Verify accepting a suggestion', 'Should apply action (e.g., create budget)'],
      ['Verify dismissing a suggestion', 'Should remove card from list'],
      ['Verify feedback thumbs up/down', 'Should record user feedback'],
      ['Verify categorization of suggestions', 'Should group by Savings, Debt, etc.'],
      ['Verify empty state when no suggestions', 'Should say "You\'re doing great!"'],
      ['Verify pull to refresh checks for new ideas', 'Should trigger AI evaluation'],
      ['Verify detail expansion on suggestion', 'Clicking should show "Why this matters"'],
      ['Verify dark mode styling', 'Cards should have correct contrast'],
      ['Verify navigation from suggestion to relevant page', 'Should deep link to target screen']
    ]
  },
  {
    screen: 'BudgetRecommendationPage', module: 'AI Assistant', prefix: 'TC-WEB-AIBUDG',
    scenarios: [
      ['Verify AI generates budget plan', 'Should output 50/30/20 or similar breakdown'],
      ['Verify accepting the AI budget', 'Should overwrite current budget settings'],
      ['Verify rejecting/canceling AI budget', 'Should discard and return'],
      ['Verify adjusting AI sliders before accepting', 'Should allow tweaking categories'],
      ['Verify total sums to 100% of income', 'Validation should enforce limits'],
      ['Verify comparison to current budget', 'Should show old vs new side by side'],
      ['Verify loading animation during generation', 'Should show thinking state (~3s)'],
      ['Verify income change triggers regeneration prompt', 'Should ask to update budget'],
      ['Verify explanation of methodology', 'Should explain why these numbers were chosen'],
      ['Verify exporting recommended budget', 'Should download as PDF/CSV']
    ]
  },
  {
    screen: 'ProfilePage', module: 'Profile & Settings', prefix: 'TC-WEB-PROFILE',
    scenarios: [
      ['Verify user details are displayed', 'Should show name, email, avatar'],
      ['Verify navigation to Edit Profile', 'Should open edit screen'],
      ['Verify displaying membership/tier status', 'Should show Free/Pro badge'],
      ['Verify stats summary (member since, total tracked)', 'Should display correct stats'],
      ['Verify logout button logs user out', 'Should clear session and go to login'],
      ['Verify delete account option is accessible', 'Should navigate to danger zone'],
      ['Verify pull to refresh updates profile', 'Should fetch latest user data'],
      ['Verify offline mode handles gracefully', 'Should show cached data'],
      ['Verify avatar image loads correctly', 'Should show image or placeholder initial'],
      ['Verify dark mode toggle shortcut', 'Should switch theme instantly']
    ]
  },
  {
    screen: 'EditProfilePage', module: 'Profile & Settings', prefix: 'TC-WEB-EDITPROF',
    scenarios: [
      ['Verify updating display name', 'Should save and reflect on profile'],
      ['Verify updating phone number', 'Should validate format and save'],
      ['Verify uploading new avatar', 'Should allow image selection and upload'],
      ['Verify removing avatar', 'Should revert to default initial'],
      ['Verify empty name validation', 'Should prevent saving empty name'],
      ['Verify discard changes prompt', 'Should warn if navigating back with changes'],
      ['Verify loading state during save', 'Button should show spinner'],
      ['Verify API error handling on save', 'Should show toast message'],
      ['Verify email address is read-only or requires auth', 'Should have disabled field or distinct flow'],
      ['Verify save button only enabled on change', 'Should prevent redundant saves']
    ]
  },
  {
    screen: 'SettingsPage', module: 'Profile & Settings', prefix: 'TC-WEB-SETTINGS',
    scenarios: [
      ['Verify navigation to Security', 'Should open security page'],
      ['Verify navigation to Preferences', 'Should open preferences page'],
      ['Verify navigation to Notifications', 'Should open notifications page'],
      ['Verify navigation to Help', 'Should open help page'],
      ['Verify app version is displayed at bottom', 'Should show vX.Y.Z'],
      ['Verify terms of service link', 'Should open external browser or modal'],
      ['Verify privacy policy link', 'Should open external browser or modal'],
      ['Verify rate the app button', 'Should trigger store review prompt'],
      ['Verify clear cache option', 'Should clear local storage and show success'],
      ['Verify responsiveness on tablet layout', 'Should use split pane or widened list']
    ]
  },
  {
    screen: 'SecurityPage', module: 'Profile & Settings', prefix: 'TC-WEB-SECURITY',
    scenarios: [
      ['Verify changing password', 'Should require old and new password and succeed'],
      ['Verify incorrect old password error', 'Should reject change'],
      ['Verify password strength on new password', 'Should enforce requirements'],
      ['Verify enabling Two-Factor Auth (2FA)', 'Should initiate 2FA setup flow'],
      ['Verify disabling 2FA', 'Should require confirmation and disable'],
      ['Verify active sessions list', 'Should show devices currently logged in'],
      ['Verify revoking a session', 'Should log out the selected device'],
      ['Verify biometric login toggle (WebAuthn)', 'Should prompt for fingerprint/FaceID'],
      ['Verify PIN code lock setup', 'Should allow setting an app PIN'],
      ['Verify locking app immediately', 'Should mask screen requiring PIN/Biometric']
    ]
  },
  {
    screen: 'PreferencesPage', module: 'Profile & Settings', prefix: 'TC-WEB-PREFS',
    scenarios: [
      ['Verify changing currency symbol', 'Should update globally across app'],
      ['Verify changing date format', 'Should reflect in all lists (MM/DD vs DD/MM)'],
      ['Verify changing language', 'Should translate UI instantly'],
      ['Verify theme selection (Light/Dark/System)', 'Should apply theme correctly'],
      ['Verify start of week setting (Sun vs Mon)', 'Should affect calendars and weekly reports'],
      ['Verify hiding balances mode (Privacy blur)', 'Should blur all amounts'],
      ['Verify default account selection', 'Should pre-select this account on new txns'],
      ['Verify data export option', 'Should allow downloading all user data'],
      ['Verify resetting preferences to default', 'Should restore original settings'],
      ['Verify changes persist after app reload', 'Settings should save to backend/storage']
    ]
  },
  {
    screen: 'HelpPage', module: 'Profile & Settings', prefix: 'TC-WEB-HELP',
    scenarios: [
      ['Verify FAQ accordion functions', 'Should expand/collapse answers'],
      ['Verify searching FAQs', 'Should filter list based on query'],
      ['Verify "Contact Support" opens form', 'Should allow sending email/ticket'],
      ['Verify empty support message validation', 'Should require text before sending'],
      ['Verify success message after contacting support', 'Should show confirmation toast'],
      ['Verify link to video tutorials', 'Should navigate to YouTube or internal player'],
      ['Verify community forum link', 'Should open in new tab'],
      ['Verify live chat widget initiation', 'Should open chat interface'],
      ['Verify report a bug option', 'Should include diagnostic info attachment'],
      ['Verify offline behavior for help content', 'Should show cached FAQs']
    ]
  },
  {
    screen: 'NotificationsPage', module: 'Profile & Settings', prefix: 'TC-WEB-NOTIF',
    scenarios: [
      ['Verify toggling push notifications', 'Should prompt for browser permission'],
      ['Verify toggling email notifications', 'Should update backend preferences'],
      ['Verify daily reminder time selection', 'Should allow picking a time'],
      ['Verify weekly summary toggle', 'Should enable/disable weekly digest'],
      ['Verify large transaction alert threshold', 'Should allow setting a custom amount'],
      ['Verify budget warning toggle (50%, 80%, 100%)', 'Should save selected thresholds'],
      ['Verify goal milestone alerts', 'Should enable celebration notifications'],
      ['Verify AI insights notification toggle', 'Should opt-in to smart alerts'],
      ['Verify disabling all notifications master switch', 'Should turn off all toggles'],
      ['Verify testing a notification', 'Should trigger a sample local notification']
    ]
  }
];

let finalOutput = `export default [\n`;

screenData.forEach(moduleData => {
  moduleData.scenarios.forEach((scen, index) => {
    const id = `${moduleData.prefix}-${String(index + 1).padStart(3, '0')}`;
    finalOutput += `  {
    id: '${id}',
    module: '${moduleData.module}',
    screen: '${moduleData.screen}',
    scenario: '${scen[0].replace(/'/g, "\\'")}',
    expected: '${scen[1].replace(/'/g, "\\'")}',
    status: 'Pending'
  },\n`;
  });
});

finalOutput += `];\n`;

fs.writeFileSync('test-suite.js', finalOutput, 'utf-8');
console.log('Successfully generated test-suite.js with 360 scenarios!');
