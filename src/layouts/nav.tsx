import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import Switcher from '../theme/ThemeSwitcher';
import { googleSignout } from '../utils/googleSignout';
import { useSession } from '../context/sessionContext';

const navElements = [
  { name: 'Home', to: '/', current: true },
  { name: 'Calculator', to: '/calculator', current: false },
  { name: 'My results', to: '/my-results', current: false },
  { name: 'All users results', to: '/users-results', current: false },
];

export const Nav = () => {
  const [navigation, setNavigation] = useState(navElements);
  const location = useLocation();
  const { img } = useSession();

  useEffect(() => {
    setNavigation(
      navElements.map((item) => ({
        ...item,
        current: item.to === location.pathname,
      }))
    );
  }, [location]);
  return (
    <Disclosure as='nav' className=' bg-sky-400 dark:bg-slate-700'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:bg-sky-400'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={clsx(
                          item.current
                            ? 'bg-gray-700 text-white dark:bg-sky-400'
                            : 'flex items-center text-white hover:bg-gray-700 hover:text-white dark:hover:bg-sky-400',
                          ' rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                    <Switcher />
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile dropdown */}
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='absolute -inset-1.5' />
                      <span className='sr-only'>Open user menu</span>
                      {img === '' ? (
                        <span className='h-8 w-8 rounded-full bg-slate-300'></span>
                      ) : (
                        <img
                          className='h-8 w-8 rounded-full'
                          src={img}
                          alt=''
                        />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to='/'
                            onClick={googleSignout}
                            className={clsx(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Sign out
                          </NavLink>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={clsx(
                    item.current
                      ? 'bg-gray-700 text-white dark:bg-sky-400'
                      : 'text-white hover:bg-gray-700 hover:text-white dark:hover:bg-sky-400',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
              <Switcher mobile />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
