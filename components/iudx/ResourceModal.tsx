/**
 * ResourceModal Component
 * Resource selection modal matching the reference UI
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import type { Resource } from '@/lib/iudx';

interface ResourceModalProps {
  visible: boolean;
  title: string;
  resources: Resource[];
  onSelect: (resourceId: string) => void;
  onCancel: () => void;
}

export function ResourceModal({
  visible,
  title,
  resources,
  onSelect,
  onCancel,
}: ResourceModalProps) {
  const { theme } = useTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selectedId) {
      onSelect(selectedId);
      setSelectedId(null);
    }
  };

  const handleCancel = () => {
    setSelectedId(null);
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <View style={[styles.overlay, { backgroundColor: theme.overlay }]}>
        <View style={[styles.sheet, { backgroundColor: theme.card }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          </View>

          {/* Description */}
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            Pick a resource from your Locker. This does not upload the file; it links a resource reference to a Consent Artefact.
          </Text>

          {/* Resource List */}
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {resources.map((resource) => {
              const isSelected = resource.id === selectedId;
              return (
                <Pressable
                  key={resource.id}
                  onPress={() => setSelectedId(resource.id)}
                  style={[
                    styles.resourceItem,
                    {
                      backgroundColor: isSelected ? theme.primaryLight : theme.card,
                      borderColor: isSelected ? theme.primary : theme.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.radio,
                      {
                        borderColor: isSelected ? theme.primary : theme.textTertiary,
                        backgroundColor: isSelected ? theme.primary : 'transparent',
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                  <View style={styles.resourceInfo}>
                    <Text style={[styles.resourceName, { color: theme.text }]}>
                      {resource.name}
                    </Text>
                    <Text style={[styles.resourceMeta, { color: theme.textSecondary }]}>
                      Type: {resource.type} • {resource.size}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Actions */}
          <View style={[styles.actions, { borderTopColor: theme.border }]}>
            <Pressable
              onPress={handleCancel}
              style={[styles.btn, styles.cancelBtn, { borderColor: theme.border }]}
            >
              <Text style={[styles.cancelBtnText, { color: theme.textSecondary }]}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              disabled={!selectedId}
              style={[
                styles.btn,
                styles.submitBtn,
                { backgroundColor: selectedId ? theme.primary : theme.backgroundTertiary },
              ]}
            >
              <Text
                style={[
                  styles.submitBtnText,
                  { color: selectedId ? '#FFFFFF' : theme.textTertiary },
                ]}
              >
                Submit
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  header: {
    padding: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  list: {
    paddingHorizontal: 20,
    maxHeight: 400,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 10,
    gap: 14,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  resourceInfo: {
    flex: 1,
    gap: 4,
  },
  resourceName: {
    fontSize: 15,
    fontWeight: '600',
  },
  resourceMeta: {
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
  submitBtn: {},
  submitBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
