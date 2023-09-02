export const Docs = () => {
  return (
    <>
      <section className='mx-auto max-w-4xl bg-gray-100 px-8 text-slate-800  dark:bg-slate-800 dark:text-white lg:flex lg:items-center'>
        <div className='container mx-auto my-10 flex flex-col items-center gap-5'>
          <h1 className='mb-4 text-2xl font-bold'>Docs</h1>
          <div>
            <h2 className='mb-2 text-xl font-bold text-green-500 dark:text-green-400'>
              Calculator Page
            </h2>
            <p>
              The Calculator page provides a graphic interface for making
              calculations or allows users to use a keyboard to perform
              calculations. Users can input numbers and perform arithmetic
              operations. If a user wishes to save a calculation result to the
              database, they can click the "Save Calculation" button. The
              calculation result will then be stored in the database.
            </p>
          </div>
          <div>
            <h2 className='mb-2 text-xl font-bold  text-green-500 dark:text-green-400'>
              MyResults Page
            </h2>
            <p>
              The MyResults page displays all the calculations that a user has
              saved. Users can view a list of their saved calculations on this
              page. Clicking on any of the calculations will navigate the user
              to a details page, where they can view more information about the
              selected calculation. Additionally, users have the option to
              remove a calculation from their saved list.
            </p>
          </div>
          <div>
            <h2 className='mb-2 text-xl font-bold text-green-500 dark:text-green-400'>
              All Users Results Page
            </h2>
            <p>
              The All Users Results page allows all users to see all
              calculations stored in the database. This includes calculations
              saved by both the current user and other users of the app.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
