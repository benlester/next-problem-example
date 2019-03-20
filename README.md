# Simple example of shallow routing and getInitialProps problem in NextJS

To run:

 1. Clone the repo `git clone git@github.com:benlester/next-problem-example.git`
 2. In frontend folder run `npm i`
 3. In backend folder run `npm i`
 4. Run the app. via the backend - `cd backend` -> `npm run start` (requires `nodemon`)

To reproduce the errant behaviour:

 1. Input a price in one of the low/high price fields - notice that the props generated by `getInitialProps` does **not change** this is expected behaviour of `router.push` shallow routing
 2. Then select a manufacturer via a check box you will see that **despite a shallow `router.push` being used the `initialQuery` props updates - but the `console.log('GET INITIAL PROPS IS BEING CALLED')
` within `getInitialProps` is seemingly not called**

I can't reconcile how the `initialQuery` props updates on the select fields being changed but  **not** on change of the brand field (`react-select` input) or the low/high price field.
