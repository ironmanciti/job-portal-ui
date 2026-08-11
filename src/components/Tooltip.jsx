const ALIGN_CLASSES = {
  center: "left-1/2 -translate-x-1/2",
  start: "left-0",
};

const ARROW_ALIGN_CLASSES = {
  center: "left-1/2 -translate-x-1/2",
  start: "left-6",
};

// hover 또는 키보드 포커스 시 설명 문구를 보여주는 툴팁 래퍼
export const Tooltip = ({ text, children, align = "center" }) => {
  const alignClass = ALIGN_CLASSES[align] || ALIGN_CLASSES.center;
  const arrowAlignClass = ARROW_ALIGN_CLASSES[align] || ARROW_ALIGN_CLASSES.center;

  return (
    <span className="relative inline-flex group/tooltip">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute bottom-full mb-3 ${alignClass} w-64 max-w-[calc(100vw-2rem)] px-4 py-3 rounded-xl border border-primary-500/30 bg-gray-800/95 backdrop-blur-lg shadow-2xl text-gray-100 text-xs text-left normal-case leading-relaxed opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:translate-y-0 transition-all duration-300 z-50`}
      >
        {text}
        <span
          className={`absolute top-full ${arrowAlignClass} -mt-1.5 h-3 w-3 rotate-45 border-b border-r border-primary-500/30 bg-gray-800/95`}
        ></span>
      </span>
    </span>
  );
};

export default Tooltip;
