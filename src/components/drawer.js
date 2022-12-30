import React from 'react';
const Drawer = ({ open, onClose = () => null, children }) => {
  let classNameProp = 'drawer';
  if (open) {
    classNameProp = 'drawer open';
  }
  console.log(open);
  return (
    <>
      <div
        style={{
          position: 'fixed',
          minHeight: '100vh',
          backgroundColor: 'rgba(0,0,0,.45)',
          top: 0,
          width: '100%',
          display: !open ? 'none' : 'block',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      ></div>
      <div className={classNameProp} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </>
  );
};

export default Drawer;
