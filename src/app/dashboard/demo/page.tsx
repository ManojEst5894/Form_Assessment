'use client';

import React, { useState } from 'react';
import CustomTextInput from '@/components/shared/textinput';
import DropdownComponent from '@/components/shared/dropdown';
import DataTableComponent from '@/components/shared/datatable';
import { Grid, Column } from '@carbon/react';


const DemoPage = () => {
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleDropdownChange = (selectedItem: any) => {
    if (selectedItem && selectedItem.text) {
      setSelectedOption(selectedItem.text);
    } else {
      setSelectedOption(null);
    }
  };

  return (
    <Grid className="demo-page">
      <Column sm={4} md={8} lg={16} className="demo-column">
        <CustomTextInput
          id="text-input-1"
          labelText="Text Input 1"
          placeholder="Enter text"
          className="custom-text-input"
          buttonText="button"
          showButton
          value={textInput1}
          onChange={(e) => setTextInput1(e.target.value)}
        />
      </Column>
      <Column sm={4} md={8} lg={16} className="demo-column">
        <CustomTextInput
          id="text-input-2"
          labelText="Text Input 2"
          placeholder="Enter text"
          className="custom-text-input"
          value={textInput2}
          onChange={(e) => setTextInput2(e.target.value)}
        />
      </Column>
      <Column sm={4} md={8} lg={16} className="demo-column">
        <DropdownComponent
          id='dropdown'
          titleText="Dropdown"
          options={[{ text: 'Select the option' }, { text: 'Option 1' }, { text: 'Option 2' }, { text: 'Option 3' }]}
          onChange={handleDropdownChange}
        />
      </Column>
      {selectedOption && (
        <Column sm={4} md={8} lg={16} className="demo-column">
          <DataTableComponent
            headers={[
              { header: 'Name', key: 'name' },
              { header: 'Protocol', key: 'protocol' },
              { header: 'Port', key: 'port' },
              { header: 'Rule', key: 'rule' },
              { header: 'Attached groups', key: 'attached_groups' }
            ]}
            rows={[
              {
                id: 'a',
                name: 'Load Balancer 3',
                protocol: 'HTTP',
                port: 3000,
                rule: 'Round robin',
                attached_groups: 'Kevin’s VM Groups',
              },
              {
                id: 'b',
                name: 'Load Balancer 1',
                protocol: 'HTTP',
                port: 443,
                rule: 'Round robin',
                attached_groups: 'Maureen’s VM Groups',
              },
              {
                id: 'c',
                name: 'Load Balancer 2',
                protocol: 'HTTP',
                port: 80,
                rule: 'DNS delegation',
                attached_groups: 'Andrew’s VM Groups',
              },
              {
                id: 'd',
                name: 'Load Balancer 6',
                protocol: 'HTTP',
                port: 3000,
                rule: 'Round robin',
                attached_groups: 'Marc’s VM Groups',
              },
              {
                id: 'e',
                name: 'Load Balancer 4',
                protocol: 'HTTP',
                port: 443,
                rule: 'Round robin',
                attached_groups: 'Mel’s VM Groups',
              },
              {
                id: 'f',
                name: 'Load Balancer 5',
                protocol: 'HTTP',
                port: 80,
                rule: 'DNS delegation',
                attached_groups: 'Ronja’s VM Groups',
              },
            ]}
          />
        </Column>
      )}
    </Grid>
  );
};

export default DemoPage;
