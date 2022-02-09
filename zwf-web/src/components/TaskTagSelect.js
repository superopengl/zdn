import React from 'react';
import PropTypes from 'prop-types';
import { Select, Tag } from 'antd';
import styled from 'styled-components';
import isString from 'lodash/isString';
import { forEach } from 'lodash';
import { concat, EMPTY, of } from 'rxjs';
import { switchMap, switchMapTo, tap } from 'rxjs/operators';
import { listTaskTags$, saveTaskTag$, subscribeTaskTags } from 'services/taskTagService';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from 'contexts/GlobalContext';
import TagSelect from './TagSelect';

const StyledSelect = styled(Select)`
font-size: 11px;
border-radius: 999px;
text-transform: lowercase;
`;

export const TaskTagSelect = React.memo((props) => {

  const { value: propValues, onChange,readonly, ...others } = props;

  const [tags, setTags] = React.useState();
  const [value, setValue] = React.useState(propValues);

  React.useEffect(() => {
    const sub$ = subscribeTaskTags(setTags);
    return () => sub$.unsubscribe()
  }, [])

  const handleCreateNewTag = tag => {
    saveTaskTag$(tag).pipe(
      switchMapTo(listTaskTags$()),
    ).subscribe();
  }

  const handleChange = (ids) => {
    setValue(ids);
    onChange(ids);
  }

  return (
    <div {...others}>
      <TagSelect 
        value={value}
        onChange={handleChange}
        readonly={readonly}
        onSave={handleCreateNewTag}
        tags={tags}
      />
    </div>
    // <StyledSelect
    //   {...others}
    //   style={{ minWidth: 30, width: '100%' }}
    //   value={value}
    //   mode="tags"
    //   options={options}
    //   // tagRender={item => {
    //   //   return <Tag key={item.id} color={item.colorHex}>{item.name}</Tag>
    //   // }}
    //   // dropdownRender={item => <Tag key={item.id} color={item.colorHex}>{item.name}</Tag>}
    //   onChange={handleChange}
    // // onSearch={handleSearch}
    // >
    //   {/* {allTags.map(item => <Select.Option key={item.id} value={item.id}>
    //     <Tag color={item.colorHex}>{item.name}</Tag>
    //   </Select.Option>)} */}
    // </StyledSelect>
  );
});

TaskTagSelect.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
};

TaskTagSelect.defaultProps = {
  readonly: false,
  onChange: () => { }
};

