import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
const segmentList = [
  { Label: ' First Name', Value: 'first_name' },
  { Label: ' Last Name ', Value: 'last_name' },
  { Label: ' Gender', Value: 'gender' },
  { Label: ' Age', Value: 'age' },
  { Label: ' Account Name', Value: 'account_name' },
  { Label: ' City', Value: 'city' },
  { Label: ' State', Value: 'state' },
];
const SavingSegment = ({ onClose = () => null }) => {
  const [totalData, setTotalData] = React.useState(segmentList);
  const [selectedData, setSelectedData] = React.useState({});
  const [listData, setListData] = React.useState([]);
  const [segmentName, setSegmentName] = React.useState('');
  const handleChange = () => {
    setListData([
      ...listData,
      ...segmentList.filter((list) => list.Label === selectedData.Label),
    ]);
    setTotalData(
      totalData.filter((list) => !(list.Label === selectedData.Label))
    );
    setSelectedData({});
  };
  const validation = () => {
    let valid = false;
    if (segmentName.length !== 0 && listData.length !== 0) {
      valid = true;
    }
    return valid;
  };
  const handleSubmit = () => {
    if (validation) {
      fetch('https://webhook.site/95e1ddd1-c60d-4cfd-8727-bc2fc601b28a', {
        method: 'POST',
        body: JSON.stringify({
          segment_name: segmentName.replace(/\s/g, '_'),
          schema: listData,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        setListData([]);
        setSegmentName('');
        setSelectedData({});
        onClose();
        alert('Data Upserted Successfully');
      });
    } else {
      alert('please fill the details');
    }
  };
  return (
    <>
      <section style={{ width: '100%' }}>
        <div style={{ margin: '1em ' }}>
          <h4>Saving Segment</h4>
        </div>
        <div style={{ borderTop: 'none', borderBottom: '1px solid black' }} />
        <div style={{ padding: '1em' }}>
          <div>
            <p>Enter the Name of the Segment </p>
            <input
              value={segmentName}
              type='text'
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </div>
          <div>
            <p>
              To Save Your segment , you need to add the schemas to build the
              query
            </p>
            <div style={{ margin: '1em 0' }}>
              {listData.length !== 0 && (
                <div style={{ border: '1px solid blue', padding: '1em' }}>
                  {listData.map((e) => (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          margin: '0.5em',
                          placeItems: 'center',
                        }}
                      >
                        <p>{e?.Label}</p>
                        <button
                          onClick={() =>
                            setListData(
                              listData.filter((list) => list.Label !== e?.Label)
                            )
                          }
                        >
                          X
                        </button>
                      </div>
                    </>
                  ))}
                </div>
              )}
              <Autocomplete
                inputValue={selectedData?.Label ?? ''}
                onChange={(e, value) => setSelectedData(value)}
                fullWidth
                size='small'
                id='combo-box-demo'
                options={totalData}
                getOptionLabel={(option) => option.Label}
                renderInput={(params) => <TextField {...params} />}
              />
              <p
                onClick={() => handleChange()}
                style={{
                  textDecoration: 'underline',
                  cursor: totalData.length !== 0 ? 'pointer' : 'not-allowed',
                  margin: '1em 0',
                }}
              >
                + Add New Schema
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className='bottomFooter'>
        <button
          disabled={listData.length === 0 ? true : false}
          onClick={() => handleSubmit()}
        >
          Save The Segement
        </button>
        <button onClick={() => onClose()}>Cancel</button>
      </div>
    </>
  );
};

export default SavingSegment;
