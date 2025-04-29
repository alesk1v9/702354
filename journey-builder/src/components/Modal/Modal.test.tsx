import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Modal from './Modal';
import { vi } from 'vitest';

const mockNode: any = {
  id: 'form-1',
  type: 'custom',
  data: {
    label: 'Form A',
    componentId: 'form-model-1',
    prerequisites: [],
    inputMapping: {}
  },
  position: { x: 0, y: 0 }
};

const mockForms = [
  {
    id: 'form-model-1',
    field_schema: {
      properties: {
        email: { title: 'Email', type: 'string' },
        name: { title: 'Name', type: 'string' }
      }
    }
  }
];

const mockNodes: any[] = [];

// Mocking the fields from the form schema
describe('Modal component', () => {
  it('should render fields from form schema', () => {
    render(
      <Modal
        isOpen={true}
        selectedNode={mockNode}
        onClose={() => {}}
        nodes={mockNodes}
        forms={mockForms}
      />
    );

    expect(screen.getByText('email')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
  });
});

// Save Btn Render Test
it('should render the save button', () => {
    render(
        <Modal
        isOpen={true}
        selectedNode={mockNode}
        onClose={() => {}}
        nodes={mockNodes}
        forms={mockForms}
        />
    );
    
    expect(screen.getByText('Save')).toBeInTheDocument();
});

// Close Btn Render Test 
it('should render the Close button', () => {
    render(
        <Modal
        isOpen={true}
        selectedNode={mockNode}
        onClose={() => {}}
        nodes={mockNodes}
        forms={mockForms}
        />
    );
    
    expect(screen.getByText('Close')).toBeInTheDocument();
});

// Close Btn Function Test 
it('should call onClose when Close button is clicked', () => {
    const onCloseMock = vi.fn(); 
  
    render(
      <Modal
        isOpen={true}
        selectedNode={mockNode}
        onClose={onCloseMock} 
        nodes={mockNodes}
        forms={mockForms}
      />
    );
  
    const closeButton = screen.getByText('Close');
    closeButton.click();
  
    expect(onCloseMock).toHaveBeenCalled(); 
  });