// This layout is for pages where we don’t want the sidebar
const FullScreenLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#29004E] to-[#5F00B4]">
        {children}
    </div>
  );
};

export default FullScreenLayout;
