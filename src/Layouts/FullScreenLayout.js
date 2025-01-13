// This layout is for pages where we don’t want the sidebar
const FullScreenLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {children}
    </div>
  );
};

export default FullScreenLayout;
