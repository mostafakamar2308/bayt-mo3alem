function loading() {
  return (
    <div className="flex items-center justify-center h-screen space-x-2 bg-white ">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-8 h-8 bg-black rounded-full animate-bounce"></div>
    </div>
  );
}

export default loading;
