'use client';

import { useState } from 'react';
import { Dropdown } from "@carbon/react";

interface DropdownComponentProps {
  onChange: (selectedItem: any) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ onChange }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = ({ selectedItem }: { selectedItem: any }) => {
    setSelectedItem(selectedItem);
    onChange(selectedItem); // Call the passed onChange handler
  };

  return (
    <div style={{ width: 400 }}>
      <Dropdown
        id="default"
        titleText="Dropdown Title" // Added titleText property
        label="This is an example label"
        invalidText="Invalid selection"
        warnText="Please notice the warning"
        items={[
          { text: 'Option 1' },
          { text: 'Option 2' },
          { text: 'Option 3' },
        ]}
        itemToString={(item) => (item ? item.text : '')}
        selectedItem={selectedItem}
        onChange={handleChange}
      />
    </div>
  );
};

export default DropdownComponent;
