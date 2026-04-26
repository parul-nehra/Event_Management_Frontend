import React from "react";
//imported from flowbite we didn't built it , all the components are imported from flowbite
import {
  HiChartPie,
  HiCalendar,
  HiClipboard,
  HiUserGroup,
  HiCurrencyDollar,
  HiChat,
  HiFolder,
  HiCog,
  HiUser,
  HiChevronDown,
} from "react-icons/hi";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  sidebarOpen: boolean;
  onToggle: () => void;
}

export function FullSidebar({
  activeView,
  onNavigate,
  sidebarOpen,
  onToggle,
}: SidebarProps) {
  const [channelsOpen, setChannelsOpen] = React.useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: HiChartPie },
    { id: "events", label: "Events", icon: HiCalendar },
    { id: "channels", label: "Channels", icon: HiUserGroup, hasDropdown: true },
    { id: "tasks", label: "Tasks Board", icon: HiClipboard },
    { id: "budget", label: "Budget", icon: HiCurrencyDollar },
    { id: "messages", label: "Messages", icon: HiChat, badge: 6 },
  ];

  const bottomItems = [
    { id: "profile", label: "Profile", icon: HiUser },
    { id: "settings", label: "Settings", icon: HiCog },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-[#F8EDEB] focus:outline-none focus:ring-2 focus:ring-[#FEC5BB]"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-white border-r border-[#D8E2DC]`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center h-16 border-b border-[#D8E2DC] bg-gradient-to-r from-[#FEC5BB] to-[#FCD5CE]">
            <h1 className="text-xl font-bold text-gray-900">Event Manager</h1>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setChannelsOpen(!channelsOpen)}
                        className={`flex items-center justify-between w-full p-3 text-sm font-medium rounded-lg transition-colors ${
                          activeView === item.id
                            ? "bg-[#FAE1DD] text-gray-900"
                            : "text-gray-700 hover:bg-[#F8EDEB]"
                        }`}
                      >
                        <div className="flex items-center">
                          <item.icon className="w-5 h-5 mr-3" />
                          <span>{item.label}</span>
                        </div>
                        <HiChevronDown
                          className={`w-4 h-4 transition-transform ${channelsOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {channelsOpen && (
                        <ul className="ml-8 mt-1 space-y-1">
                          <li>
                            <button
                              onClick={() => {
                                onNavigate("channels");
                                onToggle();
                              }}
                              className="w-full text-left p-2 text-sm text-gray-600 hover:bg-[#F8EDEB] rounded-lg"
                            >
                              All Channels
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                onNavigate("create-channel");
                                onToggle();
                              }}
                              className="w-full text-left p-2 text-sm text-gray-600 hover:bg-[#F8EDEB] rounded-lg"
                            >
                              + Create Channel
                            </button>
                          </li>
                        </ul>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        onNavigate(item.id);
                        onToggle();
                      }}
                      className={`flex items-center justify-between w-full p-3 text-sm font-medium rounded-lg transition-colors ${
                        activeView === item.id
                          ? "bg-[#FAE1DD] text-gray-900"
                          : "text-gray-700 hover:bg-[#F8EDEB]"
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full bg-[#FEC89A] text-gray-900">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-[#D8E2DC] p-3 bg-[#ECE4DB]">
            <ul className="space-y-1">
              {bottomItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      onToggle();
                    }}
                    className={`flex items-center w-full p-3 text-sm font-medium rounded-lg transition-colors ${
                      activeView === item.id
                        ? "bg-[#FAE1DD] text-gray-900"
                        : "text-gray-700 hover:bg-[#F8EDEB]"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
