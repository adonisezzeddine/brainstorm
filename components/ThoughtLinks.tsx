import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Link as LinkIcon, Tag, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ThoughtLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  tags: string[];
  notes?: string;
  createdAt: string;
}

interface ThoughtLinksProps {
  projectId: string;
}

export const ThoughtLinks = ({ projectId }: ThoughtLinksProps) => {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [thoughtLinks, setThoughtLinks] = useState<ThoughtLink[]>([]);
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    description: '',
    tags: [] as string[],
    notes: '',
  });
  const [tagInput, setTagInput] = useState('');

  const fetchThoughtLinks = async () => {
    try {
      const response = await fetch(`/api/thought-links?projectId=${projectId}`);
      if (!response.ok) throw new Error('Failed to fetch thought links');
      const data = await response.json();
      setThoughtLinks(data);
    } catch (error) {
      console.error('Error fetching thought links:', error);
      toast.error('Failed to load thought links');
    }
  };

  const handleAddLink = async () => {
    try {
      const response = await fetch('/api/thought-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newLink,
          projectId,
        }),
      });

      if (!response.ok) throw new Error('Failed to add thought link');

      toast.success('Thought link added successfully');
      setIsAdding(false);
      setNewLink({
        title: '',
        url: '',
        description: '',
        tags: [],
        notes: '',
      });
      fetchThoughtLinks();
    } catch (error) {
      console.error('Error adding thought link:', error);
      toast.error('Failed to add thought link');
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newLink.tags.includes(tagInput.trim())) {
      setNewLink(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewLink(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  return (
    <div className="space-y-6">
      {!isAdding ? (
        <Button
          onClick={() => setIsAdding(true)}
          className="w-full"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Thought Link
        </Button>
      ) : (
        <div className="space-y-4 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Add New Thought Link</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAdding(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={newLink.title}
              onChange={e => setNewLink(prev => ({ ...prev, title: e.target.value }))}
            />
            <Input
              placeholder="URL"
              value={newLink.url}
              onChange={e => setNewLink(prev => ({ ...prev, url: e.target.value }))}
            />
            <Textarea
              placeholder="Description"
              value={newLink.description}
              onChange={e => setNewLink(prev => ({ ...prev, description: e.target.value }))}
            />
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add tags"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button onClick={handleAddTag} variant="outline">
                  Add Tag
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newLink.tags.map(tag => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-sm"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <Textarea
              placeholder="Notes"
              value={newLink.notes}
              onChange={e => setNewLink(prev => ({ ...prev, notes: e.target.value }))}
            />
            <Button onClick={handleAddLink} className="w-full">
              Add Thought Link
            </Button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {thoughtLinks.map(link => (
          <div
            key={link.id}
            className="p-4 border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{link.title}</h3>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                  <LinkIcon className="w-4 h-4" />
                  {link.url}
                  <ExternalLink className="w-3 h-3" />
                </a>
                {link.description && (
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                )}
                {link.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {link.tags.map(tag => (
                      <div
                        key={tag}
                        className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-md text-sm"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
                {link.notes && (
                  <p className="text-sm text-muted-foreground">{link.notes}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 