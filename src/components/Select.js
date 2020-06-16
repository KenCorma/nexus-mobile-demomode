import React from 'react';
import { RadioButton, Portal, Dialog } from 'react-native-paper';
import styled from '@emotion/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'emotion-theming';

import memoize from 'utils/memoize';

// Converts different kinds of options into an array of `{value, display}` objects
const normalizeOptions = memoize((options) => {
  if (Array.isArray(options)) {
    return options.map((option) => ({
      value: option && (typeof option === 'object' ? option.value : option),
      display: option && (typeof option === 'object' ? option.display : option),
    }));
  } else if (typeof options === 'object') {
    return Object.entries(options).map(([value, display]) => ({
      value,
      display,
    }));
  }
  return options;
});

const SelectDialog = styled(Dialog)({
  marginVertical: 50,
});

function SelectOptions({ open, setOpen, value, updateValue, options }) {
  const theme = useTheme();

  return (
    <Portal>
      <SelectDialog
        visible={open}
        onDismiss={() => {
          setOpen(false);
        }}
      >
        <ScrollView>
          <RadioButton.Group
            value={value}
            onValueChange={(value) => {
              updateValue(value);
              setOpen(false);
            }}
          >
            {normalizeOptions(options).map(({ value, display }) => (
              <RadioButton.Item
                key={value}
                value={value}
                color={theme.primary}
                uncheckedColor={theme.foreground}
                label={display}
                labelStyle={{
                  color: theme.foreground,
                }}
              />
            ))}
          </RadioButton.Group>
        </ScrollView>
      </SelectDialog>
    </Portal>
  );
}

export default function Select({ options, value, updateValue, render }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {render({
        value,
        openSelect: () => {
          setOpen(true);
        },
      })}
      <SelectOptions
        options={options}
        value={value}
        updateValue={updateValue}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
