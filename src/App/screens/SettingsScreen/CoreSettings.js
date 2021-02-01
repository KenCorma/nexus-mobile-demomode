import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableRipple, Surface } from 'react-native-paper';

import Text from 'components/Text';
import { updateSettings, selectSettings } from 'lib/settings';
import { navigate } from 'lib/navigation';
import { useTheme } from 'lib/theme';
import { refreshCoreInfo } from 'lib/coreInfo';
import SettingItem from './SettingItem';
import commonStyles from './styles';
import { confirm } from 'lib/ui';
import { sendAPI } from 'lib/api';
import {
  scanFile,
  unlink,
  ExternalDirectoryPath,
  DocumentDirectoryPath,
} from 'react-native-fs';

const styles = {
  ...commonStyles,
  coreModeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 25,
  },
  coreModeSelector: ({ theme }) => ({
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.primary,
    flexDirection: 'row',
  }),
};

function CoreMode({ label, value }) {
  const theme = useTheme();
  const { coreMode } = useSelector(selectSettings);
  const active = coreMode === value;
  const content = (
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: active ? theme.primary : undefined,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: active ? theme.onPrimary : theme.foreground }}>
        {label}
      </Text>
    </View>
  );

  if (active) {
    return content;
  } else {
    return (
      <TouchableRipple
        onPress={async () => {
          await updateSettings({ coreMode: value });
          refreshCoreInfo();
        }}
      >
        {content}
      </TouchableRipple>
    );
  }
}

export default function CoreSettings() {
  const theme = useTheme();
  const settings = useSelector(selectSettings);

  return (
    <>
      <Text style={styles.title} sub>
        Core (Advanced)
      </Text>
      {/* <View style={styles.coreModeWrapper}>
        <View style={styles.coreModeSelector({ theme })}>
          <CoreMode value="embedded" label="Embedded Core" />
          <CoreMode value="external" label="External Core" />
        </View>
      </View> */}
      <Surface style={styles.section}>
        <SettingItem
          small
          title="External Core"
          right="arrow"
          onPress={() => {
            navigate('ExternalCoreConfig');
          }}
          description={settings.coreMode === 'external' ? 'On' : 'Off'}
          primary
        />

        {settings.coreMode === 'embedded' && (
          <>
            <SettingItem
              small
              title="Core Log"
              right="arrow"
              onPress={() => {
                navigate('EmbeddedCoreLogReader');
              }}
            />

            <SettingItem
              small
              title="Delete Database"
              description="Delete all core data and resync from scratch"
              onPress={async () => {
                const confirmed = await confirm({
                  title: 'Are you sure you want Delete?',
                  confirmLabel: 'Delete Database',
                  danger: true,
                });
                if (confirmed) {
                  await sendAPI('system/stop', {});
                  await unlink(
                    (Platform.OS === 'android'
                      ? ExternalDirectoryPath
                      : DocumentDirectoryPath) + '/Nexus/client'
                  );
                  await scanFile(
                    Platform.OS === 'android'
                      ? ExternalDirectoryPath
                      : DocumentDirectoryPath
                  );
                  showSuccess(
                    'Database deleted. Please swipe to close the app.'
                  );
                  /* Not the best solution, but we do not expect this function to be used very ofter. */
                }
              }}
            />
          </>
        )}
      </Surface>
    </>
  );
}
