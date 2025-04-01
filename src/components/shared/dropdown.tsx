'use client';

import { useState } from 'react';
import { Dropdown } from "@carbon/react";

interface DropdownComponentProps {
  initialSelectedItem:{};
  id: string;
  disabled?: boolean;
  titleText: string;
  onChange: (selectedItem: any) => void;
  options: { text: string }[];
}

const DropdownComponent = ({ onChange,
  id, options, titleText, disabled,initialSelectedItem}: DropdownComponentProps) => {
  const [selectedItem, setSelectedItem] = useState(options[0]);
  const handleChange = ({ selectedItem }: { selectedItem: any }) => {
    setSelectedItem(selectedItem);
    onChange(selectedItem);
  };

  return (
    <div>
      <div>
        <Dropdown
          id={id}
          initialSelectedItem={selectedItem}
          itemToString={(item) => (item ? item.text : '')}
          items={options}
          label={options[0]?.text || 'Select an option'}
          titleText={titleText}
          type="inline"
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default DropdownComponent;
