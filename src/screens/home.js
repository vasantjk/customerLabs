import { Drawer, SavingSegement } from '../components';
import React from 'react';
const Home = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <>
      <button onClick={() => setOpenDrawer(true)}>Save Segement</button>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <SavingSegement onClose={() => setOpenDrawer(false)} />
      </Drawer>
    </>
  );
};

export default Home;
