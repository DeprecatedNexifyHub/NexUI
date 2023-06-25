import React from 'react';
import { FormattedMessage } from 'react-intl';
import { spring } from 'react-motion';

import { HStack, Icon, Stack, Text } from 'soapbox/components/ui';
import Motion from 'soapbox/features/ui/util/optional_motion';

interface IUploadProgress {
  /** Number between 0 and 1 to represent the percentage complete. */
  progress: number,
}

/** Displays a progress bar for uploading files. */
const UploadProgress: React.FC<IUploadProgress> = ({ progress }) => {
  return (
    <HStack alignItems='center' space={2}>
      <Icon
        src={require('@tabler/icons/cloud-upload.svg')}
        className='w-7 h-7 text-gray-500'
      />

      <Stack space={1}>
        <Text theme='muted'>
          <FormattedMessage id='upload_progress.label' defaultMessage='Uploading…' />
        </Text>

        <div className='w-full h-1.5 rounded-lg bg-gray-200 relative'>
          <Motion defaultStyle={{ width: 0 }} style={{ width: spring(progress) }}>
            {({ width }) =>
              (<div
                className='absolute left-0 top-0 h-1.5 bg-primary-600 rounded-lg'
                style={{ width: `${width}%` }}
              />)
            }
          </Motion>
        </div>
      </Stack>
    </HStack>
  );
};

export default UploadProgress;
