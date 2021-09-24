import { AutoComplete, Typography, Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { listOrgExistingClients } from 'services/orgService';
import getInnerText from 'react-innertext';
import HighlightingText from './HighlightingText';

const { Text } = Typography;

const StyledAutoComplete = styled(AutoComplete)`
  .ant-select-selector {
    height: 50px !important;
    padding-top: 4px !important;
    padding-bottom: 4px !important;
    // display: flex;
    // align-items: center;
  }

  .ant-select-selection-search {
    display: flex;
    align-items: center;
  }

  .ant-select-selection-placeholder {
    margin-top: 6px;
  }
`;

const getDisplayName = (client) => {
  const { givenName, surname, email } = client;
  const displayName = `${givenName ?? ''} ${surname ?? ''}`.trim();
  return displayName || email;
}

const ClientAutoComplete = (props) => {
  const { value, onChange, ...other } = props;

  const [searchText, setSearchText] = React.useState();
  const [options, setOptions] = React.useState([]);

  const loadEntity = () => {
    return listOrgExistingClients()
      .subscribe(resp => generateOptions(resp.data));
  }

  React.useEffect(() => {
    const subscription$ = loadEntity();
    return () => {
      subscription$.unsubscribe();
    }
  }, []);

  const generateOptions = (clients = []) => {
    const options = clients.map(c => ({
      label: <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 5, paddingBottom: 5 }}>
        <div style={{ margin: 0, lineHeight: '1rem' }}>
          <HighlightingText value={getDisplayName(c)} search={searchText} />
        </div>
        <Text style={{ margin: 0, lineHeight: '0.8rem' }} type="secondary"><small>
          <HighlightingText value={c.email} search={searchText} />
        </small></Text>
      </div>,
      value: c.email,
      item: c,
    }));
    setOptions(options);
  }

  return (
    <>
    <StyledAutoComplete
      // showSearch
      autoFocus
      allowClear
      backfill
      placeholder="Search by name or email"
      // // optionFilterProp="searchText"
      // value={value}
      onChange={onChange}
      onSearch={val => {
        setSearchText(val);
        setOptions([...options]);
      }}
      filterOption={(input, option) => {
        const { givanName, surname, email } = option.item;
        return email?.includes(input) || givanName?.includes(input) || surname?.includes(input);
      }}
      {...other}
      options={options}
    >
      {/* {clientList.map(c => (<Select.Option key={c.id} value={c.id} item={c}>
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 5, paddingBottom: 5 }}>
          <div style={{ margin: 0, lineHeight: '1rem' }}>
            <HighlightingText value={getDisplayName(c)} search={searchText} />
          </div>
          <Text style={{ margin: 0, lineHeight: '0.8rem' }} type="secondary"><small>
            <HighlightingText value={c.email} search={searchText} />
          </small></Text>
        </div>
      </Select.Option>))}
      <Input.Search size="large" placeholder="Search by name or email" /> */}
    </StyledAutoComplete>
    </>
  )
};

ClientAutoComplete.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

ClientAutoComplete.defaultProps = {
};

export default ClientAutoComplete;
