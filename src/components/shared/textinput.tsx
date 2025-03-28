'use client';

import { useState } from 'react';
import { TextInput, Button } from  "@carbon/react";


const CustomTextInput = () => {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: 300 }}>
      <TextInput
        className="input-test-class"
        defaultValue={value}
        // helperText="Helper text"
        id="text-input-1"
        invalidText="Error message goes here"
        labelText="Textinput"
        onChange={(e) => setValue(e.target.value)}
        onClick={() => console.log('Input clicked')}
        placeholder=""
        size="md"
        type="text"
        warnText="Warning message that is really long can wrap to more lines but should not be excessively long."
      />
    </div>
  );
};

export default CustomTextInput;
