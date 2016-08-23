import React from 'react';
import PropVal from './PropVal';

const PropTypesMap = new Map();
for (const typeName in React.PropTypes) {
  if (!React.PropTypes.hasOwnProperty(typeName)) {
    continue;
  }
  const type = React.PropTypes[typeName];
  PropTypesMap.set(type, typeName);
  PropTypesMap.set(type.isRequired, typeName);
}

const stylesheet = {
  propTable: {
    marginLeft: -10,
    borderSpacing: '10px 5px',
    borderCollapse: 'separate',
  },
};

export default class PropTable extends React.Component {
  render() {
    const type = this.props.type;
    console.warn("Type: ", type);
    if (!type) {
      return null;
    }

    const props = {};

    if (type.propTypes) {
      for (const property in type.propTypes) {
        if (!type.propTypes.hasOwnProperty(property)) {
          continue;
        }
        const typeInfo = type.propTypes[property];
        const propType = PropTypesMap.get(typeInfo) || 'other';
        const required = typeInfo.isRequired === undefined ? 'yes' : 'no';
        props[property] = { property, propType, required };
      }
    }

    if (type.defaultProps) {
      for (const property in type.defaultProps) {
        if (!type.defaultProps.hasOwnProperty(property)) {
          continue;
        }
        const value = type.defaultProps[property];
        if (value === undefined) {
          continue;
        }
        if (!props[property]) {
          props[property] = { property };
        }
        props[property].defaultValue = value;
      }
    }

    if (type.propDescriptions) {
      for (const property in type.propDescriptions) {
        // if there's no matching prop, skip the description
        if (!type.propDescriptions.hasOwnProperty(property)) { continue; }

        // The value of the description
        const value = type.propDescriptions[property];

        // Skip undefined values
        if (value === undefined) { continue; }

        // If we don't have this prop yet, save it
        if (!props[property]) {
          props[property] = { property };
        }

        props[property].propDescriptions = value;
      }
    }

    const array = Object.values(props);
    console.warn('sbai.PropTable ', array);
    if (!array.length) {
      return <small>No propTypes defined!</small>;
    }
    array.sort(function (a, b) {
      return a.property > b.property;
    });

    return (
      <table className="props-table" style={stylesheet.propTable}>
        <thead>
          <tr>
            <th className="props-table__header">property</th>
            <th className="props-table__header">propType</th>
            <th className="props-table__header">required</th>
            <th className="props-table__header">default</th>
            <th className="props-table__header">description</th>
          </tr>
        </thead>
        <tbody>
          {array.map(row => (
            <tr className="props-table__row" key={row.property}>
              <td className="props-table__cell cell__property">{row.property}</td>
              <td className="props-table__cell cell__type">{row.propType}</td>
              <td className="props-table__cell cell__required">{row.required}</td>
              <td className="props-table__cell cell__default">{row.defaultValue === undefined ? '-' : <PropVal val={row.defaultValue} />}</td>
              <td className="props-table__cell cell__description">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

PropTable.displayName = 'PropTable';
PropTable.propTypes = {
  type: React.PropTypes.func,
};
