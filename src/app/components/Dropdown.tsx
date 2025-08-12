export type DropdownItem = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

type Props = {
  header?: string;
  items?: DropdownItem[];
  onClick?: () => void;
};

/**
 * Dumb, reusable Dropdown component.
 *
 * - Purely presentational: accepts `header` and `items`.
 * - Renders semantic buttons (not anchors) for menu actions.
 * - Keeps the same structure and classes so existing CSS (e.g. .dropdown:focus-within .dropdown-menu)
 *   will continue to work without further changes.
 */
export default function Dropdown({ header, items, onClick }: Props) {
  const defaultItems: DropdownItem[] = [
    { label: "Account settings", onClick: () => {} },
    { label: "Support", onClick: () => {} },
    { label: "License", onClick: () => {} },
    { label: "Sign out", onClick: () => {} },
  ];
  const menuItems = items ?? defaultItems;

  return (
    <div className="flex items-center justify-center p-12">
      <div className=" relative inline-block text-left dropdown">
        <span className="rounded-md shadow-sm">
          <button
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
            type="button"
            aria-haspopup="true"
            aria-expanded="true"
            aria-controls="headlessui-menu-items-117"
          >
            <span>Options</span>
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </span>

        <div className="hidden dropdown-menu">
          <div
            className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
            aria-labelledby="headlessui-menu-button-1"
            id="headlessui-menu-items-117"
            role="menu"
          >
            {header && (
              <div className="px-4 py-3">
                <p className="text-sm leading-5">Signed in as</p>
                <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                  {header}
                </p>
              </div>
            )}

            <div className="py-1">
              {items &&
                menuItems.map((it, idx) => (
                  <button
                    key={`${idx}-${it.label}`}
                    type="button"
                    className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!it.disabled && it.onClick) it.onClick();
                      onClick?.();
                    }}
                  >
                    {it.label}
                  </button>
                ))}

              {!items && (
                /* default for example */
                <>
                  {menuItems.slice(0, 2).map((it, idx) => (
                    <button
                      key={it.label}
                      type="button"
                      className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                      role="menuitem"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!it.disabled && it.onClick) it.onClick();
                        onClick?.();
                      }}
                    >
                      {it.label}
                    </button>
                  ))}

                  <span
                    role="menuitem"
                    tabIndex={-1}
                    className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                    aria-disabled="true"
                  >
                    New feature (soon)
                  </span>

                  {menuItems.slice(2, 3).map((it) => (
                    <button
                      key={it.label}
                      type="button"
                      className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                      role="menuitem"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!it.disabled && it.onClick) it.onClick();
                        onClick?.();
                      }}
                    >
                      {it.label}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
